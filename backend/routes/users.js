const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById, updateProfile, updateAvatar, getUserInfo } = require('../controllers/users');
const urlValidation = require('../middlewares/validation');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getUserInfo);

usersRoutes.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  getUserById,
);

usersRoutes.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

usersRoutes.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(urlValidation),
    }),
  }),
  updateAvatar,
);

exports.usersRoutes = usersRoutes;
