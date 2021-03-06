import React from "react";
import "reflect-metadata";
import type { AppProps } from "next/app";
import "../css/tailwind.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
