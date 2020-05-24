import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Info from '../components/Info'
import Card from '../components/Card'
import SetTemp from '../components/SetTemp'
import RecordingControl from '../components/RecordingControl'
import { query, mutation } from "../graphql/gqlClient";

export const NAME_QUERY = `
  query {
    users {
      name
    }
    log {
      id
      temperature
    }
    setting {
      set_point_max
      set_point_min
    }
  }
`;


// const NEW_TEMP = gql`
// subscription onNewTemp  {
//   newTemp {
//     temperature
//   }
// }
// `;

// Do no server side render this
const Graph = dynamic(
  () => import('../components/Graph'),
  { ssr: false }
)

const Home = ({ users, log, setting }) => {
  return (
    <div>
      <Head>
        <title>Levan Out</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h2>{users[0].name}</h2>
      <h2>{`${log.id}: ${log.temperature}`}</h2>
      <button onClick={() => mutation(SET_LED)}>Add data</button>

      <main className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pr-4">
            <Card >
              <Info />
            </Card>
          </div>
          <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pl-4 order-last sm:order-none">
            <Card >
              <SetTemp setting={setting} />
            </Card>
          </div>
          <div className="flex-initial w-100 min-w-full mb-8">
            <Card >
              <RecordingControl />
              <Graph />
            </Card>
          </div>
        </div>
      </main>
    </div>)
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get data
  const data = await query(NAME_QUERY);

  // console.log(data);


  // By returning { props: venues }, the Home component
  // will receive `venues` as a prop at build time
  return {
    props: {
      users: data.users,
      log: data.log,
      // logs: data.logs,
      setting: data.setting
    },
  };
}

export default Home;
