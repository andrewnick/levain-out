import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import fs from 'fs';
import https from 'https';
import http from 'http';
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { createTypeormConn } from "./lib/createTypeormConn";

const typeorm = async () => {
  return await createTypeormConn();
}

const startApolloServer = async () => {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: 'raspberrypi.local' },
    development: { ssl: true, port: 443, hostname: 'raspberrypi.local' },
    // development: { ssl: false, port: 4000, hostname: 'localhost' },
  };

  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  let httpServer;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    // https://linuxize.com/post/creating-a-self-signed-ssl-certificate/
    httpServer = https.createServer(
      {
        key: fs.readFileSync(`/home/pi/.ssl/express.key`),
        cert: fs.readFileSync(`/home/pi/.ssl/express.crt`)
      },
      app,
    );
  } else {
    httpServer = http.createServer(app);
  }

  await new Promise(resolve => httpServer.listen({ port: config.port }, resolve));
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${server.graphqlPath}`
  );

  return { server, app };
}

try {
  typeorm();
  startApolloServer()
} catch (e) {
  throw Error('DB connection not initialised');
}

