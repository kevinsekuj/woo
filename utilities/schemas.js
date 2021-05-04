const Joi = require("joi");

const siteSchema = Joi.object({
	site: Joi.object({
		name: Joi.string().required().max(40).messages({
			"string.max":
				"The title must be less than or equal to 40 characters.",
		}),
		price: Joi.number().required().min(0).messages({
			// this should never be reached, but just in case
			"number.min":
				"You must enter a price. If the location is free, enter 0.",
		}),
		description: Joi.string().required().max(350).messages({
			"string.max":
				"There is a 350 character limit on location descriptions.",
		}),
		location: Joi.string().required().max(60).messages({
			"string.max": "Please keep the location to under 30 characters.",
		}),
		// image: Joi.string(),
	}).required(),
	deleteImages: Joi.array(), // array containing checked img filepaths
});

module.exports = siteSchema;
