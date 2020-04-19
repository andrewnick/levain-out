import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Levan Out</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="container">
        <Header />
        <h2>Hi</h2>
      </main>
    </div>)
}

export default Home;
