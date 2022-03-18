import React, { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { DateTime, Duration } from "luxon";
import Header from "../components/Header";
import Info from "../components/Info";
import Card from "../components/Card";
import SetTemp from "../components/SetTemp";
import RecordingControl from "../components/RecordingControl";
import { query } from "../graphql/gqlClient";
import { Log, Setting, Session } from "../../types/global";
import useSWR from "swr";

const Graph = dynamic(() => import("../components/Graph"), {
  ssr: false,
});

interface IndexServerSideProps {
  log: Log;
  logs: Array<Log>;
  setting: Setting;
}

export const NAME_QUERY = `
  query {
    setting {
      set_point
      set_point_tolerance
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

const GET_SESSION = `
  query getSession {
    session {
      id
      status
      logs {
        created_at
        temperature
        humidity
        switch
      }
    }
  }
`;

// interface Home {
//   // log: Log;
//   // setting: Setting;
//   // initialLogs: Log[];
// }

// const useRecordingState = (data) => {
//   let isRecording = false;
//   if (data?.session) {
//     isRecording = data.session.status === 'started'

//   }
//   return useState(isRecording);
// }

const Home = () => {
  const { data, error } = useSWR<{ session: Session }, boolean>(
    GET_SESSION,
    query
    // {
    //   refreshInterval: 9000,
    // }
  );

  const [recording, setRecording] = useState(false);
  useEffect(() => {
    setRecording(data?.session?.status === "started");
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { session } = data;
  const { logs } = session;
  console.log(session);

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
              {Boolean(logs.length) && recording && (
                <>
                  <Info logs={logs} />
                  {Boolean(logs.length) && <Graph logs={logs} />}
                </>
              )}
              {/* <RecordingControl
                recording={recording}
                setRecording={setRecording}
              /> */}
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

export default Home;
