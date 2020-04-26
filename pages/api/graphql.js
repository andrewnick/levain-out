import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from "micro-cors";
import '../../db/init'
import Log from '../../db/models/Log'
// import RaspIOInit from '../../lib/raspio';

// console.log('hi');

// RaspIOInit();

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// var board = new five.Board({
//   io: new RaspiIO()
// });

// board.on("ready", function () {
//   var led = new five.Led("P1-13");
//   led.blink();
// });

// const typeDefs = gql`
//   type Query {
//     users: [User!]!
//   }
//   type User {
//     name: String
//   }
// `
const typeDefs = gql`
  type Query {
    users: [User!]!,
    log: Log!
  }
  type Mutation {
    setLed: Led
  }
  type User {
    name: String
  }
  type Log {
    id: Int,
    created_at: String,
    temperature: String,
    humidity: String,
    set_point: String
  }
  type Led {
    status: String
  }
`

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }];
    },
    log(parent, args, context) {
      const get = async () => {
        return await Log.query().where('id', 1).first();
      }

      return get();
    },
  },
  Mutation: {
    setLed(root, args) {
      console.log('test');

      const set = async () => {
        return await Log.query().insert({
          temperature: 24.04,
          humidity: 80.12,
          set_point: 26
        });
      }

      set()

      return { status: 'yes' };
    },
  }
}

const cors = Cors({
  origin: '*',
  allowMethods: ["GET", "POST", "OPTIONS"]
});

const apolloServer = new ApolloServer({ typeDefs, resolvers })

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
}

export default cors(handler);
