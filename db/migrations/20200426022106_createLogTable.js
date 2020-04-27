
exports.up = function (knex) {
    return knex.schema.createTable('logs', table => {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.decimal('temperature', 5, 2);
        table.decimal('humidity', 5, 2);
        table.decimal('set_point', 5, 2);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('logs')
};
