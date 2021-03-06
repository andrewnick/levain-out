import Knex from "knex";

exports.up = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.createTable("settings", (table) => {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.decimal("set_point", 5, 1);
    table.decimal("set_point_tolerance", 5, 1);
  });
};

exports.down = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.dropTable("settings");
};
