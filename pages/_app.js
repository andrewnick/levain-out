import React from 'react'
import App from 'next/app'
import '../css/tailwind.css'
import next from 'next';
import terminate from '../lib/terminate';

// if (typeof window === "undefined") {
//     console.log(typeof next);
//     const exitHandler = terminate(next, {
//         coredump: true,
//         timeout: 500
//     })

//     process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
//     process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
//     process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
//     process.on('SIGINT', exitHandler(0, 'SIGINT'))
// }

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

export default MyApp