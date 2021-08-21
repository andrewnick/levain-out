import "reflect-metadata";
import { Log } from "./db/model/Log";
import { Setting } from "./db/model/Setting";
import { Session, StatusType } from "./db/model/Session";
import readSensor, { switchOnOff } from "./lib/hardwareControl";
import { createTypeormConn } from "./lib/createTypeormConn";

let readSensorInterval;

const typeorm = async () => {
  return await createTypeormConn();
}

try {
  typeorm();
} catch (e) {
  throw Error('DB connection not initialised');
}

export default {
  Query: {
    log(parent, args, context) {
      return Log.getLastLog();
    },
    async logs(parent, args, context) {
      // const sess = await Session.currentSession();
      const sess = await Session.sessionById(34);
      // console.log(sess.id);
      const logs = await sess.logs;

      return logs
        ? logs
        : {
          id: 0,
          created_at: 0,
          temperature: 0,
          humidity: 0,
          switch: false,
        };
    },
    setting(parent, args, context) {
      return Setting.getLatestSetting();
    },
  },
  Mutation: {
    setSetting(root, args) {
      const set = async () => {
        const setting = new Setting();
        setting.set_point = args.set_point;
        setting.set_point_tolerance = args.set_point_tolerance;
        await setting.save();

        return setting;
      };

      set();
      return Setting.getLatestSetting();
    },
    async startRecording(root, args) {
      console.log("Start Recording");
      // const setting = await Setting.getLatestSetting();

      const sess = new Session();
      sess.status = StatusType.STARTED;
      sess.save();

      readSensorInterval = setInterval(readSensor, 2000);
      // console.log(readSensorInterval);

      return { id: sess.id };
    },
    async pauseRecording(root, args) {
      console.log("pause Recording");

      const sess = await Session.currentSession();
      sess.status = StatusType.PAUSED;
      sess.save();

      return { id: sess.id };
    },
    async stopRecording(root, args) {
      console.log("Stop Recording");
      // console.log(readSensorInterval);

      switchOnOff(0);

      const sess = await Session.currentSession();
      sess.status = StatusType.FINISHED;
      sess.save();

      clearInterval(readSensorInterval);

      return { id: sess.id };
    },
  },
};