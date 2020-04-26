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
}

export default Log;