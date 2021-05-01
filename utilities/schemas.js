const Joi = require("joi");

const siteSchema = Joi.object({
	site: Joi.object({
		name: Joi.string().required(),
		price: Joi.number().required().min(0),
		description: Joi.string().required(),
		location: Joi.string().required(),
		// image: Joi.string(),
	}).required(),
	deleteImages: Joi.array(), // array containing checked img filepaths
});

module.exports = siteSchema;
