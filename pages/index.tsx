import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { Duration } from "luxon";
import Header from "../components/Header";
import Info from "../components/Info";
import Card from "../components/Card";
import SetTemp from "../components/SetTemp";
import RecordingControl from "../components/RecordingControl";
import { query, mutation } from "../graphql/gqlClient";
import Setting from "../db/models/Setting";
import Log from "../db/models/Log";
import { LogType } from "@/types/global";
import useSWR from "swr";

const CustomGraph = dynamic(() => import("@/components/CustomGraph"), {
  ssr: false,
});

const Graph = dynamic(() => import("@/components/Graph"), {
  ssr: false,
});
interface IndexServerSideProps {
  log: Log;
  logs: Array<LogType>;
  setting: Setting;
}
interface LogProps {
  logs: Array<LogType>;
}

export const NAME_QUERY = `
  query {
    log {
      id
      temperature
      humidity
    }
    setting {
      set_point_max
      set_point_min
    }
    logs {
      created_at
      temperature
      humidity
      lamp_on
    }
  }
`;

const SET_LED = `
  mutation setLed  {
    setLed {
      status
    }
  }
`;

const GET_LOGS = `
  query {
    logs {
      created_at
      temperature
      humidity
      lamp_on
    }
  }
`;

// interface LogType {
//   logs: Array<{
//     id: number;
//     temperature: string;
//     humidity: string;
//     created_at: string;
//     lamp_on: string;
//   }>;
// }

// Do no server side render this
// const Graph = dynamic(() => import("../components/Graph/index"), {
//   ssr: false,
// });

const Home: React.FC<{
  log: Log;
  setting: Setting;
  initialLogs: Array<LogType>;
}> = ({ log, setting, initialLogs }) => {
  const { data, error } = useSWR<{ logs: Array<LogType> }, boolean>(
    GET_LOGS,
    query,
    {
      refreshInterval: 2000,
      // initialData: initialLogs,
    }
  );
  console.log(data);

  let LogGraph = <div>loading...</div>;
  let lastLog = { temperature: "0", humidity: "0", created_at: "0" };
  let firstLog = { temperature: "0", humidity: "0", created_at: "0" };
  let logTimeDifference: Duration | null = null;
  if (error) {
    LogGraph = <div>failed to load</div>;
  } else if (data) {
    LogGraph = <Graph logs={data.logs} />;
    lastLog = data.logs[data.logs.length - 1];
    firstLog = data.logs[0];
    logTimeDifference = Duration.fromMillis(
      parseInt(lastLog.created_at) - parseInt(firstLog.created_at)
    );
  }

  const duration: string = "1:00";
  const recording: boolean = true;
  return (
    <div>
      <Head>
        <title>Levan Out</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex-initial w-100 min-w-full mb-8">
            <Card>
              {recording ? (
                <>
                  <Info
                    temperature={parseFloat(lastLog.temperature)}
                    humidity={parseFloat(lastLog.humidity)}
                    // duration={ms(logTimeDifference)}
                    duration={
                      logTimeDifference
                        ? logTimeDifference.toFormat("h:mm:ss")
                        : null
                    }
                  />
                  {LogGraph}
                </>
              ) : (
                <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pl-4 order-last sm:order-none">
                  <SetTemp setting={setting} />
                </div>
              )}
              <RecordingControl recording={recording} />
            </Card>
          </div>
          {/* <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pr-4">
            <Card>
              <h3>Manual override</h3>
              <button
                onClick={() => mutation(SET_LED)}
                className="w-full shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Toggle Light
              </button>
            </Card>
          </div> */}
        </div>
      </main>
    </div>
  );
};

// This function gets called at build time
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call an external API endpoint to get data
  const { log, setting, logs: initialLogs }: IndexServerSideProps = await query(
    NAME_QUERY
  );
  return {
    props: {
      log,
      initialLogs,
      setting,
    },
  };
};

export default Home;
