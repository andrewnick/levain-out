import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Info from '../components/Info'
import Card from '../components/Card'
import SetTemp from '../components/SetTemp'
import Graph from '../components/Graph'

const Home = () => {
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
            <Graph />
          </div>
        </div>
      </main>
    </div>)
}

export default Home;
