import "reflect-metadata";
import { Log } from "./db/model/Log";
import { Setting } from "./db/model/Setting";
import { Session, StatusType } from "./db/model/Session";
import readSensor, { switchOnOff } from "./lib/hardwareControl";
import { buildPaginator } from 'typeorm-cursor-pagination';
import { getConnection } from "typeorm";

let readSensorInterval;

export default {
  Query: {
    async log(parent, args, context) {
      try {
        const log = Log.getLastLog();
        return log
      } catch (e) {
        console.log(e);
      }
      return null
    },
    async session() {
      const currentSession = await Session.currentSession();
      return currentSession ?? await Session.lastSession()
    },
    async paginatedLogs(parent, args, context) {
      const { limit = 10, order = 'ASC', cursor: inputCursor } = args
      console.log({ inputCursor });

      // try {
      const session = await Session.currentSession();
      const queryBuilder = getConnection()
        .getRepository(Log)
        .createQueryBuilder('log')
        .where("log.sessionId = :sessionId", { sessionId: session.id });

      const paginator = buildPaginator({
        entity: Log,
        paginationKeys: ['id'],
        query: {
          limit,
          order,
          afterCursor: inputCursor.afterCursor,
          beforeCursor: inputCursor.beforeCursor
        },
      });

      const { data: logs, cursor } = await paginator.paginate(queryBuilder);

      return {
        logs,
        cursor
      }
    },
    async logs(parent, args, context) {
      const emptyLog = [{
        id: 0,
        created_at: 0,
        temperature: 0,
        humidity: 0,
        switch: false,
      }]

      try {
        const session = await Session.currentSession();
        console.log(session);
        console.log(session.logs);

        return session.logs || emptyLog
      } catch (e) {
        console.log(e);
      }

      return emptyLog
    },
    setting(parent, args, context) {
      // return {
      //   set_point: 7,
      //   set_point_tolerance: 5
      // }
      return Setting.getLatestSetting();
    },
  },
  Mutation: {
    async setSetting(root, args) {
      const set = async () => {
        const setting = new Setting();
        setting.set_point = args.set_point;
        setting.set_point_tolerance = args.set_point_tolerance;
        await setting.save();

        return setting;
      };

      try {
        await set();
      } catch (e) {
        console.log(e);
      }

      return Setting.getLatestSetting();
    },
    async startRecording(root, args) {
      console.log("Start Recording");
      try {
        // const setting = await Setting.getLatestSetting();

        const sess = new Session();
        sess.status = StatusType.STARTED;
        sess.save();

        readSensorInterval = setInterval(readSensor, 2000);
        // console.log(readSensorInterval);

        return { id: sess.id };
      } catch (e) {
        console.log(e);
      }

      return null
    },
    async pauseRecording(root, args) {
      console.log("pause Recording");
      try {
        const sess = await Session.currentSession();
        sess.status = StatusType.PAUSED;
        sess.save();

        return { id: sess.id };
      } catch (e) {
        console.log(e);
      }

      return null
    },
    async stopRecording(root, args) {

      console.log("Stop Recording");
      // console.log(readSensorInterval);
      try {
        switchOnOff(0);

        const sess = await Session.currentSession();
        sess.status = StatusType.FINISHED;
        sess.save();

        clearInterval(readSensorInterval);

        return { id: sess.id };
      } catch (e) {
        console.log(e);
      }

      return null
    },
    async on(root, args) {
      switchOnOff(1);
      return true
    },
    async off(root, args) {
      switchOnOff(0);
      return false
    }
  },
};