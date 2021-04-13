const Joi = require("joi");

const reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		review: Joi.number().required(),
	}).required(),
});

module.exports = reviewSchema;
