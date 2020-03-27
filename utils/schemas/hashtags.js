const Joi = require('joi')

const hashtagIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const hashtagTagSchema = Joi.array().items(Joi.string().max(10))

const createHashtagSchema = {
  name: Joi.string()
    .max(50)
    .required(),
  price: Joi.number()
    .min(1)
    .max(1000000),
  image: Joi.string().required(),
  tags: hashtagTagSchema
}

const updateHashtagSchema = {
  name: Joi.string().max(50),
  price: Joi.number()
    .min(1)
    .max(1000000),
  image: Joi.string(),
  tags: hashtagTagSchema
}

module.exports = {
  hashtagIdSchema,
  hashtagTagSchema,
  createHashtagSchema,
  updateHashtagSchema
}
