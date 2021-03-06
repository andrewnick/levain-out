
exports.up = function (knex) {
    return knex.schema.createTable('settings', table => {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.decimal('set_point_max', 5, 1);
        table.decimal('set_point_min', 5, 1);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('settings')
};
