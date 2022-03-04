import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import fs from 'fs';
import https from 'https';
import http from 'http';
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { createTypeormConn } from "./lib/createTypeormConn";
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import terminate from './lib/logging/terminate';

const typeorm = async () => {
  return await createTypeormConn();
}

console.log("Starting levain-out");



Sentry.init({
  dsn: "https://a66a666d33214c0d8c8e0b26e8596d1e@o1061411.ingest.sentry.io/6051751",
  // integrations: [
  // used for rewriting SourceMaps from js to ts
  // check that sourcemaps are enabled in tsconfig.js
  // read the docs https://docs.sentry.io/platforms/node/typescript/
  // new RewriteFrames({
  //   root: process.cwd(),
  // }) as any,
  // Output sended data by Sentry to console.log()
  // new Debug({ stringify: true }),
  // ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  // tracesSampleRate: 1.0,
});

const apolloServerSentryPlugin: ApolloServerPlugin = {
  // For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  async requestDidStart() {
    return {
      async didEncounterErrors(rc) {
        Sentry.withScope((scope) => {
          scope.addEventProcessor((event) =>
            Sentry.Handlers.parseRequest(event, (rc.context as any).req)
          );

          // public user email
          const userEmail = (rc.context as any).req?.session?.userId;
          if (userEmail) {
            scope.setUser({
              // id?: string;
              ip_address: (rc.context as any).req?.ip,
              email: userEmail,
            });
          }

          scope.setTags({
            graphql: rc.operation?.operation || 'parse_err',
            graphqlName: (rc.operationName as any) || (rc.request.operationName as any),
          });

          rc.errors.forEach((error) => {
            if (error.path || error.name !== 'GraphQLError') {
              scope.setExtras({
                path: error.path,
              });
              Sentry.captureException(error);
            } else {
              scope.setExtras({});
              Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
            }
          });
        });
      },
    };
  },
};

// const transaction = Sentry.startTransaction({
//   op: "test",
//   name: "My First Test Transaction",
// });


const startApolloServer = async () => {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: 'raspberrypi.local' },
    development: { ssl: true, port: 443, hostname: 'raspberrypi.local' },
  };

  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];
  let httpServer;
  const app = express();

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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [apolloServerSentryPlugin, ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ req }), // important to pass req to context (it is used in `rc.context.req`)
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app });


  await new Promise(resolve => httpServer.listen({ port: config.port }, resolve));
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${server.graphqlPath}`
  );

  return { server, app };
}


const setUp = async () => {
  // try {
  typeorm();
  const { server } = await startApolloServer()

  const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500
  })

  process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
  process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
  process.on('SIGINT', exitHandler(0, 'SIGINT'))
  // } catch (e) {
  //   throw Error('DB connection not initialised');
  // }
}

setUp()






