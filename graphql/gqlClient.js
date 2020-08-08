import { GraphQLClient } from "graphql-request";

const port = 3000;
const host = "http";
const domain =
  process.browser !== "undefined" ? `localhost:${port}` : `localhost:${port}`;
// const domain = `localhost:${port}`;

const API = `${host}://${domain}/api/graphql`;

// Add headers and other config into the client
const client = new GraphQLClient(API);

export const query = (query) => client.request(query);
export const mutation = (mutationQuery, variables = {}) =>
  client.request(mutationQuery, variables);
