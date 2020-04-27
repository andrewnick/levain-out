import { Model } from 'objection';

class Log extends Model {
    static get tableName() {
        return 'logs';
    }

    // Optional JSON schema. This is not the database schema. Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['temperature', 'humidity'],

            properties: {
                id: { type: 'integer' },
                parentId: { type: ['integer', 'null'] },
                created_at: { type: 'string', minLength: 1, maxLength: 255 },
                temperature: { type: ['number', 'null'] },
                humidity: { type: ['number', 'null'] },
            }
        };
    }

    async add(temperature, humidity) {
        return await Log.query().insert({
            temperature: temperature,
            humidity: humidity,
            set_point: 26
        });
    }

    async getLastLog() {
        const logs = await Log.query()

        if (!logs.length) {
            return {
                id: 0,
                created_at: 0,
                temperature: 0,
                humidity: 0,
            }
        }

        return logs[logs.length - 1];
    }
}

export default Log;