const siteSchema = require("./schemas");
const expressError = require("./error");

const validate = (req, res, next) => {
	const { error } = siteSchema.validate(req.body);

	if (error) {
		throw new expressError(
			error.details[0].message,
			400 + " - Bad request"
		);
	} else {
		next();
	}
};

module.exports = validate;

// validation middleware for server side validation

// client side validation with boostrap forms and server side
// validation with joi and expresserror handling
// validate requests with joi before saving with mongoose

// catch and destructure errors from request body, pass to error handler
// middleware
