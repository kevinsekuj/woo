/**
 * Custom error handler class for use in displaying errors in more detail in views
 */
class ServerError extends Error {
    constructor(status, message) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = ServerError;
