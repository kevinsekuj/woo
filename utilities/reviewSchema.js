const Joi = require("joi");

const reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		rating: Joi.number().required().max(5).min(0),
	}).required(),
});

module.exports = reviewSchema;
