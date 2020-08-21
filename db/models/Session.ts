import { Model } from "objection";
import Log from "./Log";

class Session extends Model {
  id!: number;
  set_point_max!: number;
  set_point_min!: number;

  static tableName = "sessions";

  // Optional JSON schema. This is not the database schema. Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",
    properties: {
      id: { type: "integer" },
      set_point_max: { type: "integer", default: 0 },
      set_point_min: { type: "integer", default: 0 },
    },
  };

  // This object defines the relations to other models.
  static relationMappings = () => ({
    // Importing models here is a one way to avoid require loops.
    logs: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model
      // subclass constructor or an absolute file path
      // to a module that exports one. We use a model
      // subclass constructor `Animal` here.
      modelClass: Log,
      join: {
        from: "sessions.id",
        to: "logs.session_id",
      },
    },
  });

  async getCurrentSession() {
    let session = await Session.query()
      .where({ status: "started" })
      .orWhere({ status: "paused" })
      .orderBy("id", "desc")
      .first();

    // console.log(session);

    if (!session) {
      session = await Session.query().orderBy("id", "desc").first();
    }

    return session;
  }

  async getSession(id) {
    let session = await Session.query().where({ id: id }).first();

    // console.log(session);

    if (!session) {
      session = await Session.query().orderBy("id", "desc").first();
    }

    return session;
  }
}

export default Session;
