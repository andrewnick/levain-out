import Knex from "knex";

exports.up = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.createTable("sessions", (table) => {
    table.increments("id").primary();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.enu("status", ["started", "paused", "finished"], {
      useNative: true,
      enumName: "session_status",
    });
  });
};

exports.down = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.dropTable("sessions");
};
