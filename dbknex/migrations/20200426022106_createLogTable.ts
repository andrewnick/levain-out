import Knex from "knex";

exports.up = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.createTable("logs", (table) => {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.decimal("temperature", 5, 2);
    table.decimal("humidity", 5, 2);
    table.boolean("switch");
    table.integer("session_id");
  });
};

exports.down = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.dropTable("logs");
};
