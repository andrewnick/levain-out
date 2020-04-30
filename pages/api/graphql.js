import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from "micro-cors";
import { PubSub, withFilter } from 'graphql-subscriptions';
import '../../db/init'
import Log from '../../db/models/Log'
import Setting from '../../db/models/Setting'
import readSensor from '../../lib/hardwareControl';
// import RaspIOInit from '../../lib/raspio';

// RaspIOInit();

const NEW_TEMP = 'NEW_TEMP';


const typeDefs = gql`
  type Query {
    users: [User!]!,
    log: Log!,
    setting: Setting!
  }
  type Mutation {
    setLed: Led
    setSetting(max: Int!, min: Int!): Setting
  }
  type Subscription {
    newTemp: Temp
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
  type Setting {
    id: Int,
    created_at: String,
    set_point_max: String,
    set_point_min: String
  }
  type Temp {
    temperature: String
  }
  type Led {
    status: String
  }
`
const pubsub = new PubSub();

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }];
    },
    log(parent, args, context) {
      return new Log().getLastLog();
    },
    setting(parent, args, context) {
      return new Setting().getLatestSetting();
    }
  },
  Mutation: {
    setLed(root, args) {
      readSensor();
      // pubsub.publish(NEW_TEMP, { temp: 99 });
      return { status: 'yes' };
    },
    setSetting(root, args) {
      const set = async () => {
        return await Setting.query().insert({
          set_point_max: args.max,
          set_point_min: args.min
        });
      }

      set()
    }
  },
  // Subscription: {
  //   newTemp: {
  //     temp: () => pubsub.asyncIterator([NEW_TEMP]),
  //   }
  // }
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
