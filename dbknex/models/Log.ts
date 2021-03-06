import { Model } from "objection";
import Session from "./Session";

class Log extends Model {
  id!: number;
  parentId?: number;
  temperature?: number;
  humidity?: number;
  switch?: boolean;
  set_point?: number;
  set_point_tolerence?: number;

  static tableName = "logs";

  // Optional JSON schema. This is not the database schema. Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",
    required: ["temperature", "humidity"],

    properties: {
      id: { type: "integer" },
      parentId: { type: ["integer", "null"] },
      // created_at: { type: 'string', minLength: 1, maxLength: 255 },
      temperature: { type: ["number", "null"] },
      humidity: { type: ["number", "null"] },
      switch: { type: ["boolean", "null"] },
      set_point: { type: ["number", "null"] },
      set_point_tolerance: { type: ["number", "null"] },
    },
  };

  // This object defines the relations to other models.
  static relationMappings = () => ({
    // Importing models here is a one way to avoid require loops.
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: Session,
      join: {
        from: "logs.session_id",
        to: "sessions.id",
      },
    },
  });

  async add(
    temperature: number,
    humidity: number,
    set_point: number,
    set_point_tolerance: number
  ) {
    return await Log.query().insert({
      temperature,
      humidity,
      set_point,
      set_point_tolerance,
    });
  }

  async getLastLog() {
    const logs = await Log.query();

    if (!logs.length) {
      return {
        id: 0,
        created_at: 0,
        temperature: 0,
        humidity: 0,
        set_point: 0,
        set_point_tolerance: 0,
      };
    }

    return logs[logs.length - 1];
  }

  // Get n last log
  // e.g getNLastLog(2) get second to last log
  async getNLastLog(n: number) {
    const logs = await Log.query();

    if (!logs.length) {
      return {
        id: 0,
        created_at: 0,
        temperature: 0,
        humidity: 0,
      };
    }

    return logs[logs.length - n];
  }

  async getAllLogs() {
    const logs = await Log.query();
    return logs;
  }

  getDefault() {
    return {
      id: 0,
      created_at: 0,
      temperature: 0,
      humidity: 0,
      switch: false,
    };
  }
}

export default Log;
