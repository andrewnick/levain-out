
exports.up = function (knex) {
    return knex.schema.createTable('logs', table => {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.decimal('temperature', 5, 2);
        table.decimal('humidity', 5, 2);
        table.boolean('lamp_on', 5, 2);
        table.integer('session_id')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('logs')
};
