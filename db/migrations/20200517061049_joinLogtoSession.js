
exports.up = function (knex) {
    return knex.schema.alterTable('logs', function (table) {
        table.foreign('session_id')
            .references('sessions.id')
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('logs', function (table) {
        table.dropForeign('session_id')
    })
};
