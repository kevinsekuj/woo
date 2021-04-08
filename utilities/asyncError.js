// takes function as parameter and returns a new function which
// executes func, catching any errors and passes to next middleware
// as alternative to try/catch block

const asyncWrapper = func => {
	return (req, res, next) => {
		func(req, res, next).catch(next);
	};
};

module.exports = asyncWrapper;
