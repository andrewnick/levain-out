import { ApolloServer, ExpressContext } from "apollo-server-express";
import * as Sentry from '@sentry/node';

function terminate(server: ApolloServer<ExpressContext>, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = code => {
        options.coredump ? process.abort() : process.exit(code)
    }

    return (code, reason) => (err, promise) => {
        console.log({ err, code, reason });

        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            // console.log(err.message, err.stack)
            Sentry.captureException(err);
        }

        // Attempt a graceful shutdown
        server.stop()
        setTimeout(exit, options.timeout).unref()
    }
}

export default terminate