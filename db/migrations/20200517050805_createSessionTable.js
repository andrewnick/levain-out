
exports.up = function (knex) {
    return knex.schema.createTable('sessions', table => {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.enu('status', ['started', 'paused', 'finished'], { useNative: true, enumName: 'session_status' })
        table.enu('type', ['temp_control', 'temp_measure'], { useNative: true, enumName: 'session_type' })
        table.decimal('set_point_min', 5, 1);
        table.decimal('set_point_max', 5, 1);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('sessions')
};
