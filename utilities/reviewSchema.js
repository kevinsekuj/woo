const Joi = require("joi");

const reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required().max(500).messages({
			"string.max": "Please keep reviews to under 500 characters.",
		}),
		rating: Joi.number().required().max(5).min(0),
	}).required(),
});

module.exports = reviewSchema;
