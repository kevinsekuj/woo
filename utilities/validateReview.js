const reviewSchema = require("./reviewSchema");
const expressError = require("./error");

const validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	console.log(error);
	if (error) {
		throw new expressError(
			error.details[0].message,
			400 + " - Bad request"
		);
	} else {
		next();
	}
};

module.exports = validateReview;
