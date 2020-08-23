import { GraphQLClient } from "graphql-request";
import isMac from "../lib/isMac";

const port: number = 3000;
const host: string = "http";
const domain: string =
  process.browser !== undefined && !isMac()
    ? `raspberrypi.local:${port}`
    : `localhost:${port}`;

const API: string = `${host}://${domain}/api/graphql`;

// Add headers and other config into the client
const client: GraphQLClient = new GraphQLClient(API);

export const query: <T>(query: string) => Promise<T> = (query) =>
  client.request(query);

export const mutation: <T>(
  mutationQuery: string,
  variables?: object
) => Promise<T> = (mutationQuery, variables = {}) =>
  client.request(mutationQuery, variables);
