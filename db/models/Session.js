import { Model } from 'objection';

class Session extends Model {
    static get tableName() {
        return 'sessions';
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

    // This object defines the relations to other models.
    // static get relationMappings() {
    //     // Importing models here is a one way to avoid require loops.
    //     const Log = require('./Log');

    //     return {
    //         logs: {
    //             relation: Model.HasManyRelation,
    //             // The related model. This can be either a Model
    //             // subclass constructor or an absolute file path
    //             // to a module that exports one. We use a model
    //             // subclass constructor `Animal` here.
    //             modelClass: Log,
    //             join: {
    //                 from: 'session.id',
    //                 to: 'log.sessionId'
    //             }
    //         },
    //     }
    // }

    async getCurrentSession() {
        // const sessions = await Session.query().where('status', '=', 'started').orWhere('status', '=', 'paused').limit(1)
        const sessions = await Session.query().where({ status: 'started' }).orWhere({ status: 'paused' }).limit(1)
        console.log(sessions);
    }
}

export default Session;