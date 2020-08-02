// Logs for winston logging (accessed by winston)
exports.up = function (knex) {
    return knex.schema.createTable('winston_logs', table => {
        table.increments('id').primary();
        table.timestamp('timestamp').defaultTo(knex.fn.now())
        table.string('level'),
            table.string('message'),
            table.json('meta')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('winston_logs')
};

