import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Info from '../components/Info'
import Card from '../components/Card'
import SetTemp from '../components/SetTemp'
import Graph from '../components/Graph'
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag'
import withData from '../lib/apollo'

export const NAME_QUERY = gql`
  query {
    users {
      name
    }
    log {
      id
      temperature
    }
  }
`

const SET_LED = gql`
  mutation setLed {
    setLed {
      status
    }
  }
`;

const Home = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    NAME_QUERY, {}
  )

  const [setLed, { leddata }] = useMutation(SET_LED);


  if (error) {
    console.log(error);
    return <div>Error loading posts.</div>
  }
  if (loading) return <div>Loading</div>

  const { users, log } = data

  return (
    <div>
      <Head>
        <title>Levan Out</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h2>{users[0].name}</h2>
      <h2>{`${log.id}: ${log.temperature}`}</h2>
      <button onClick={() => setLed()}>Add data</button>

      <main className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pr-4">
            <Card >
              <Info />
            </Card>
          </div>
          <div className="flex-initial w-full sm:w-1/2 mb-8 sm:pl-4 order-last sm:order-none">
            <Card >
              <SetTemp />
            </Card>
          </div>
          <div className="flex-initial w-100 min-w-full h-48 mb-8">
            <Card >
              <Graph />
            </Card>
          </div>
        </div>
      </main>
    </div>)
}

// export default Home;
export default withData(props => (<Home />));
