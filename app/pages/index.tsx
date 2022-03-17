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
import useSWR, { useSWRInfinite } from "swr";
import Graph from "../components/Graph";

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
  query {
    session {
      id,
      status
    }
  }
`;

function createPaginatedLogsQuery({
  sessionId,
  limit = 10,
  afterCursor = null,
  beforeCursor = null,
}: {
  sessionId: number;
  limit?: number;
  afterCursor?: string | null;
  beforeCursor?: string | null;
}) {
  // console.log({limit, afterCursor, beforeCursor});

  const afC = afterCursor ? `"${afterCursor}"` : null;

  return `query {
            paginatedLogs(sessionId: ${69}, limit: ${limit}, cursor: {
              beforeCursor: ${beforeCursor},
              afterCursor: ${afC},
            }) {
              cursor {
                afterCursor
                beforeCursor
              }
              logs {
                created_at
                temperature
                humidity
                switch
              }
            }
          }`;
}

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

const getKey = (pageIndex, previousPageData, sessionId, limit) => {
  // console.log('getKey');
  // console.log({ pageIndex });
  // console.log({ previousPageData });
  // console.log({ sessionId });
  if (pageIndex === 0) return createPaginatedLogsQuery({ sessionId, limit });

  if (
    previousPageData &&
    previousPageData?.paginatedLogs?.cursor?.afterCursor == null
  )
    return null;

  const afterCursor =
    previousPageData?.paginatedLogs?.cursor?.afterCursor ?? null;

  const query = createPaginatedLogsQuery({ sessionId, afterCursor, limit });
  return query;
};

const Home = () => {
  const [indexSize, setIndexSize] = useState(8000);
  const [logPageSize, setLogPageSize] = useState(3);
  const { data: sessionData, error: sessionError } = useSWR<
    { session: Session },
    boolean
  >(GET_SESSION, query);

  const session = sessionData?.session;

  const {
    data: logData,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, session.id, indexSize),
    query,
    {
      initialSize: logPageSize,
    }
  );

  console.log({ size });

  const [recording, setRecording] = useState(false);
  useEffect(() => {
    setRecording(sessionData?.session?.status === "started");
  }, [sessionData]);

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  // const { session } = data
  // const { logs } = session
  console.log({ logData, error, isValidating, mutate, size, setSize });
  useEffect(() => {
    let timer;
    if (logData) {
      const lastLogSet = logData[logData.length - 1];
      const moreLogs = lastLogSet.paginatedLogs.cursor.afterCursor !== null;
      timer = setTimeout(() => {
        if (moreLogs) {
          setSize(logPageSize);
          setLogPageSize(logPageSize + 1);
          setIndexSize(10);
        }
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [logPageSize, logData]);

  const logs = logData && logData.flatMap((value) => value.paginatedLogs.logs);
  // console.log({logData[logData.length - 1]});
  console.log({ logs });

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
              {Boolean(logs?.length) && (
                <>
                  <Info logs={logs} />
                  {Boolean(logs?.length) && <Graph logs={logs} />}
                </>
              )}
              <RecordingControl
                recording={recording}
                setRecording={setRecording}
              />
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
