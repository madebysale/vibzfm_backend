const Joi = require('joi');

export const getOtherUserProfile = {
  body: {
    userId: Joi.number().required(),
  },
};