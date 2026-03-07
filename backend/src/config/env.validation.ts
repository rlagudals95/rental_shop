import * as Joi from "joi";

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string().uri().required(),
  CORS_ORIGIN: Joi.string().default("http://localhost:3000"),
  INTERNAL_API_KEY: Joi.string().allow("").optional(),
  OPENAI_API_KEY: Joi.string().allow("").optional(),
  OPENAI_MODEL: Joi.string().default("gpt-4.1-mini"),
});
