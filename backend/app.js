require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require("cors");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const urlValidation = require('./middlewares/validation');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./errors/handleErrors');

const { PORT = 3000 } = process.env;
const app = express(); // подключаем экспресс

const corsWhiteList = [
  'https://olgaliubar.students.nomoredomains.monster',
  'http://olgaliubar.students.nomoredomains.monster',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }
  },
  credentials: true,
};

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());

app.use(cors(corsOptions));

app.use(requestLogger);// логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(urlValidation),
      about: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

// авторизация
app.use(auth);
app.use(router);

app.use(errorLogger); // логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(handleErrors);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
}

main();
