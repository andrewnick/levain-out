import { GraphQLClient } from "graphql-request";

// const port: number = 4000;
// const host: string = "http";

// const origin: string = process.browser
//   ? window.location.origin
//   : `${host}://localhost:${port}`;
const origin: string = `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;
console.log(process.env.NEXT_PUBLIC_SERVER_PORT);
console.log(origin);

const API: string = `${origin}/graphql`;

// Add headers and other config into the client
const client: GraphQLClient = new GraphQLClient(API);

export const query: <T>(query: string) => Promise<T> = (query) =>
  client.request(query);

export const mutation: <T>(
  mutationQuery: string,
  variables?: object
) => Promise<T> = (mutationQuery, variables = {}) =>
    client.request(mutationQuery, variables);
