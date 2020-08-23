import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Info from "../components/Info";
import Card from "../components/Card";
import SetTemp from "../components/SetTemp";
import RecordingControl from "../components/RecordingControl";
import { query, mutation } from "../graphql/gqlClient";

interface IndexServerSideProps {
  log: { id: number; temperature: string; humidity: string };
  logs: Array<{ id: number; temperature: string; humidity: string }>;
  setting: { set_point_max: string; set_point_min: string };
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
  }
`;

const SET_LED = `
  mutation setLed  {
    setLed {
      status
    }
  }
`;

// Do no server side render this
const Graph = dynamic(() => import("../components/Graph/index"), {
  ssr: false,
});

const Home = ({ log, setting }) => {
  return (
    <div>
      <Head>
        <title>Levan Out</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pr-4">
            <Card>
              <Info temp={log.temperature} humidity={log.humidity} />
              <button
                onClick={() => mutation(SET_LED)}
                className="w-full shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Toggle Light
              </button>
            </Card>
          </div>
          <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pl-4 order-last sm:order-none">
            <Card>
              <SetTemp setting={setting} />
            </Card>
          </div>
          <div className="flex-initial w-100 min-w-full mb-8">
            <Card>
              <RecordingControl />
              <Graph />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

// This function gets called at build time
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Call an external API endpoint to get data
  const { log, setting }: IndexServerSideProps = await query(NAME_QUERY);
  return {
    props: {
      log: log,
      // logs: data.logs,
      setting: setting,
    },
  };
};

export default Home;
