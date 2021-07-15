const router = require('express').Router();
const { usersRoutes } = require('./users');
const { cardsRoutes } = require('./cards');
const nonExistentRoute = require('./nonExistentRoute');

router.use('/users', usersRoutes);

router.use('/cards', cardsRoutes);

router.use(nonExistentRoute);

module.exports = router;
