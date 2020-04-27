import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from "micro-cors";
import '../../db/init'
import Log from '../../db/models/Log'
import Setting from '../../db/models/Setting'
import readSensor from '../../lib/hardwareControl';
// import RaspIOInit from '../../lib/raspio';

// RaspIOInit();

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
      return new Log().getLastLog();
    },
    setting(parent, args, context) {

      // const { id,
      //   created_at,
      //   set_point_max,
      //   set_point_min } = await new Setting().getLatestSetting();
      // const get = async () => {
      //   return await new Setting().getLatestSetting();
      // }

      // const set = get();
      // console.log({
      //   id,
      //   created_at,
      //   set_point_max,
      //   set_point_min
      // });

      // if (!set.length) {
      //   return new Setting().getDefault();
      // }

      return new Setting().getLatestSetting();
    }
  },
  Mutation: {
    setLed(root, args) {
      // const set = async () => {
      //   return await Log.query().insert({
      //     temperature: 24.04,
      //     humidity: 80.12,
      //     set_point: 26
      //   });
      // }

      // set()

      readSensor();

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
      return {
        id: 1,
        created_at: 2,
        set_point_max: 2,
        set_point_min: 2
      }
    }
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
