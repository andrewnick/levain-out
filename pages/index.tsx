import React, { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { Duration } from "luxon";
import Header from "../components/Header";
import Info from "../components/Info";
import Card from "../components/Card";
import SetTemp from "../components/SetTemp";
import RecordingControl from "../components/RecordingControl";
import { query } from "../graphql/gqlClient";;
import { LogType, Log, Setting } from "@/types/global";
import useSWR from "swr";

const Graph = dynamic(() => import("@/components/Graph"), {
  ssr: false,
});

interface IndexServerSideProps {
  log: Log;
  logs: Array<LogType>;
  setting: Setting;
}

export const NAME_QUERY = `
  query {
    log {
      id
      temperature
      humidity
    }
    setting {
      set_point
      set_point_tolerance
    }
    logs {
      created_at
      temperature
      humidity
      switch
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
      switch
    }
  }
`;

interface Home {
  log: Log;
  setting: Setting;
  initialLogs: LogType[];
}

const Home = ({ log, setting, initialLogs }: Home) => {
  const { data, error } = useSWR<{ logs: Array<LogType> }, boolean>(
    GET_LOGS,
    query,
    {
      refreshInterval: 2000,
      // initialData: initialLogs,
    }
  );
  console.log(data);

  const [isRecording, setIsRecording] = useState(false);

  // useEffect(() => {
  //   const setRecordingStatus = async () => {
  //     const sess = await new Session().getCurrentSession();
  //     setIsRecording(sess.status === 'started');
  //   }
  //   setRecordingStatus();
  // }, [sess])

  let LogGraph = <div>loading...</div>;
  let lastLog = { temperature: "0", humidity: "0", created_at: "0" };
  let firstLog = { temperature: "0", humidity: "0", created_at: "0" };
  let logTimeDifference: Duration | null = null;
  if (error) {
    LogGraph = <div>failed to load</div>;
  } else if (data) {
    lastLog = data.logs[data.logs.length - 1];
    firstLog = data.logs[0];
    logTimeDifference = Duration.fromMillis(
      parseInt(lastLog.created_at) - parseInt(firstLog.created_at)
    );

    LogGraph = <Graph logs={data.logs} />;
    // LogGraph = <Graph logs={data.logs} firstLog={firstLog} lastLog={lastLog} />;
  }

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
              {isRecording ? (
                <>
                  <Info
                    temperature={parseFloat(lastLog.temperature)}
                    humidity={parseFloat(lastLog.humidity)}
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
                  <SetTemp set_point_tolerance={setting.set_point_tolerance} set_point={setting.set_point} />
                </div>
              )}
              <RecordingControl recording={isRecording} isRecording={setIsRecording} />
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

export const getServerSideProps: GetServerSideProps = async () => {
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
