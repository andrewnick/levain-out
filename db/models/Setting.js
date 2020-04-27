import { Model } from 'objection';

class Setting extends Model {
    static get tableName() {
        return 'settings';
    }

    // Optional JSON schema. This is not the database schema. Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                set_point_max: { type: ['integer', 0] },
                set_point_min: { type: ['integer', 0] }
            }
        };
    }

    async getLatestSetting() {
        const settings = await Setting.query();
        console.log(settings);

        if (!settings.length) {
            return this.getDefault();
        }

        return settings[settings.length - 1];
    }

    getDefault() {
        return {
            id: 1,
            set_point_max: 25,
            set_point_min: 27
        };
    }
}

export default Setting;