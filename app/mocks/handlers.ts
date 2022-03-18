// src/mocks/handlers.js
import { graphql } from "msw";
import logs from "./data/logs.json";

export const handlers = [
  // Handles a "Login" mutation
  //   graphql.mutation("startRecording", null),
  graphql.query("getSession", (req, res, ctx) => {
    return res(
      ctx.data({
        session: {
          id: 74,
          status: "started",
          logs,
        },
      })
    );
  }),
];
