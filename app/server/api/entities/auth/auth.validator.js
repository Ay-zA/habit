import { Joi } from 'celebrate';

export default {
  signup: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      name: Joi.string(),
      password: Joi.string()
        .min(6)
        .required()
    }
  },
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required()
    }
  }
};
