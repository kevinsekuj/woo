/**
 * Error handling wrapper for async functions
 * @param {object} func - function wrapped by async wrapper
 * @returns execute func, catch errors & pass to error handler
 */
const asyncWrapper = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

module.exports = asyncWrapper;
