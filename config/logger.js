import { createLogger } from 'winston';
import Postgres from '@pauleliet/winston-pg-native';
import config from './global';

const options = {
    connectionString: config.development.pg.connection,
    level: 'info',
    poolConfig: {
        // number of milliseconds to wait before timing out when connecting a new client
        // by default this is 0 which means no timeout
        connectionTimeoutMillis: 0,
        // number of milliseconds a client must sit idle in the pool and not be checked out
        // before it is disconnected from the backend and discarded
        // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
        idleTimeoutMillis: 10000,
        // maximum number of clients the pool should contain
        // by default this is set to 10.
        max: 10
    },
    tableName: 'winston_logs'
};

const nullLogger = {
    log: function () { }
}

const logger = typeof window === "undefined" ? createLogger({
    transports: [
        new Postgres(options)
    ]
}) : nullLogger;



module.exports = logger;