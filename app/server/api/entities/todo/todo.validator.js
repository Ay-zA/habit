import Joi from 'joi';

export default {
  post: {
    body: {
      title: Joi.string().required(),
      isCompleted: Joi.boolean().default(false)
    }
  }
};
