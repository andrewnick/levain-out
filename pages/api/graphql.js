import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from "micro-cors";
import { PubSub, withFilter } from 'graphql-subscriptions';
import '../../db/init'
import Log from '../../db/models/Log'
import Setting from '../../db/models/Setting'
import Session from '../../db/models/Session';
import readSensor from '../../lib/hardwareControl';
// import RaspIOInit from '../../lib/raspio';

// RaspIOInit();

const NEW_TEMP = 'NEW_TEMP';

let readSensorInterval;
let sessionID;

const typeDefs = gql`
  type Query {
    users: [User!]!,
    log: Log!,
    logs: [Log!]
    setting: Setting!,
  }
  type Mutation {
    setLed: Led
    setSetting(max: Int!, min: Int!): Setting
    startRecording: Session
    pauseRecording: Session
    stopRecording: Session
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
    humidity: String
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
  type Session {
    id: Int
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
    async logs(parent, args, context) {
      const sess = await new Session().getCurrentSession()
      console.log(sess.id);
      const logs = await sess.$relatedQuery('logs');

      return logs ? logs : {
        id: 0,
        created_at: 0,
        temperature: 0,
        humidity: 0,
      };
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
      const tempSetting = {
        set_point_max: args.max,
        set_point_min: args.min
      }

      const set = async () => {
        return await Setting.query().insert(tempSetting);
      }

      set()
      return new Setting().getLatestSetting();
    },
    async startRecording(root, args) {
      console.log('start Recording');
      const setting = await new Setting().getLatestSetting()

      const sess = await Session.query().insert({
        type: 'temp_measure',
        status: 'started',
        set_point_min: setting.set_point_min,
        set_point_max: setting.set_point_max
      })

      console.log(sess);


      readSensorInterval = setInterval(readSensor, 2000);

      return { id: sess.id };
    },
    async pauseRecording(root, args) {
      console.log('pause Recording');
      const sess = await new Session().getCurrentSession()
      Session.findById(sess.id).update({ status: 'paused' })
      return { id: sess.id }
    },
    async stopRecording(root, args) {
      console.log('stop Recording');

      const sess = await new Session().getCurrentSession()
      const updatedSession = await Session.query().patchAndFetchById(sess.id, { status: 'finished' })

      clearInterval(readSensorInterval);

      return { id: sess.id };
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
