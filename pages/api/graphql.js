import { ApolloServer, gql } from 'apollo-server-micro'
import five from "johnny-five";
import { RaspiIO } from "raspi-io";
import Cors from "micro-cors";

var board = new five.Board({
  io: new RaspiIO()
});

board.on("ready", function () {
  var led = new five.Led("P1-13");
  led.blink();
});

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
    users: [User!]!
  }
  type Mutation {
    setLed: Led
  }
  type User {
    name: String
  }
  type Led {
    status: String
  }
`

const resolvers = {
  Query: {
    users(parent, args, context) {
      // console.log(parent);
      // console.log(args);
      // console.log(context);

      return [{ name: 'Nextjs' }]
    },
  },
  Mutation: {
    setLed(root, args) {
      // const board = new five.Board({
      //   io: new RaspiIO()
      // });
      // var led = new five.Led("P1-13");

      // if (args.status == 'on') {
      //   board.on("ready", function () {
      //     led.on();
      //   });
      // } else {
      //   board.on("ready", function () {
      //     led.off();
      //   });
      // }
      console.log('test');

      return { status: 'yes' };
    },
  }
}

const cors = Cors({
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
