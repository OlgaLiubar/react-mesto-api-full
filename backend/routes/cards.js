const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards');
const urlValidation = require('../middlewares/validation');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(urlValidation),
    }),
  }),
  createCard,
);

cardsRoutes.delete(
  '/:id',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().length(24).hex(),
      })
      .unknown(true),
  }), deleteCardById,
);

cardsRoutes.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().length(24).hex(),
      })
      .unknown(true),
  }), likeCard,
);

cardsRoutes.delete(
  '/:id/likes',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().length(24).hex(),
      })
      .unknown(true),
  }), dislikeCard,
);

exports.cardsRoutes = cardsRoutes;
