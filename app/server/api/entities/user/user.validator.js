import { Joi } from 'celebrate';

export default {
  post: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string(),
      password: Joi.string()
        .min(6)
        .required()
    }
  }
};
