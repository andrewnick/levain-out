import React from "react";
import type { AppProps } from "next/app";
import "../css/tailwind.css";

if (process.env.NODE_ENV === "development") {
  require("../mocks");
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
