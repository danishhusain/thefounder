const express = require('express');
const rootRouter = express.Router();
const user = require('./v1/userRoutes');
const employmentTypeRoutes = require('./v1/employmentTypeRoutes');
const roleRoutes = require('./v1/roleRoutes');
const userInformationRoutes = require('./v1/userInformationRoutes');
const utilityRoute = require('./v1/utilityRoute');



rootRouter.use('/user', user)
rootRouter.use('/employment-types', employmentTypeRoutes);
rootRouter.use('/roles', roleRoutes);
rootRouter.use('/information', userInformationRoutes);
rootRouter.use('/utility', utilityRoute);

module.exports = rootRouter