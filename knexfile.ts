// Update with your config settcings.
import isMac from "./lib/isMac";

const psqlConnection = isMac()
  ? {
      host: "127.0.0.1",
      user: "andrew",
      password: "",
      database: "levain-out",
    }
  : "postgresql://pi:password@localhost:5432/levain-out";

export default {
  development: {
    client: "postgresql",
    connection: psqlConnection,
    searchPath: ["knex", "public"],
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
