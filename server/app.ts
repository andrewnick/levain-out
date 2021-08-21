import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { createTypeormConn } from "./lib/createTypeormConn";

const typeorm = async () => {
  return await createTypeormConn();
}

const startApolloServer = async () => {

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

try {
  typeorm();
  startApolloServer()
} catch (e) {
  throw Error('DB connection not initialised');
}

