import { ApolloServer, gql } from 'apollo-server-micro'
// import five from "johnny-five";
// import { RaspiIO } from "raspi-io";



// board.on("ready", function () {
//   var led = new five.Led("P1-13");
//   led.blink();
// });

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`
// const typeDefs = gql`
//   type Query {
//     users: [User!]!
//   }
//   // type Mutation {
//   //   setLed(status: String!): Led
//   // }
//   type User {
//     name: String
//   }
//   // type Led {
//   //   status: String
//   // }
// `

const resolvers = {
  Query: {
    users(parent, args, context) {
      // console.log(parent);
      // console.log(args);
      // console.log(context);

      return [{ name: 'Nextjs' }]
    },
  }
  // Mutation: {
  //   setLed: (root, args) => {
  //     // const board = new five.Board({
  //     //   io: new RaspiIO()
  //     // });
  //     // var led = new five.Led("P1-13");

  //     // if (args.status == 'on') {
  //     //   board.on("ready", function () {
  //     //     led.on();
  //     //   });
  //     // } else {
  //     //   board.on("ready", function () {
  //     //     led.off();
  //     //   });
  //     // }

  //     return { status: args.status };
  //   },
  // }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: 'http://localhost:3000/api/graphql' })
