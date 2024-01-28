const express = require('express');
const rootRouter = express.Router();
const user = require('./v1/userRoutes');



rootRouter.use('/user', user)

module.exports = rootRouter