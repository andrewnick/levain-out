import logger from "../config/logger";

function terminate(server, options = { coredump: false, timeout: 500 }) {
    if (typeof window !== "undefined") {
        return (200, 'All good here');
    }

    // Exit function
    const exit = code => {
        options.coredump ? process.abort() : process.exit(code)
    }

    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            console.log(err.message, err.stack)
            logger.log('error', err.message, err.stack);

        }

        // Attempt a graceful shutdown
        server.close(exit)
        setTimeout(exit, options.timeout).unref()
    }
}

module.exports = terminate