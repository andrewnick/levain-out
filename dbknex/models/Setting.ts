import { Model } from "objection";

class Setting extends Model {
  id!: number;
  set_point!: number;
  set_point_tolerance!: number;

  static tableName = "settings";

  // Optional JSON schema. This is not the database schema. Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",
    properties: {
      id: { type: "integer" },
      set_point: { type: "integer", default: 0 },
      set_point_tolerance: { type: "integer", default: 0 },
    },
  };

  async getLatestSetting() {
    const settings = await Setting.query();
    // console.log(settings);
    // console.log(this.getDefault());

    if (!settings.length) {
      // console.log(this.getDefault());

      return this.getDefault();
    }

    return settings[settings.length - 1];
  }

  getDefault() {
    return {
      id: 1,
      set_point: 25,
      set_point_tolerance: 27,
    };
  }
}

export default Setting;
