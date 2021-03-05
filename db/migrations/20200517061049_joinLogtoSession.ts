import Knex from "knex";

exports.up = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.alterTable("logs", function (table) {
    table.foreign("session_id").references("sessions.id");
  });
};

exports.down = function (knex: Knex, Promise: Promise<any>) {
  return knex.schema.alterTable("logs", function (table) {
    table.dropForeign(["session_id"]);
  });
};
