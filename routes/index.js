const {Router} = require('express');
const { positionRoutes } = require('./positions');
const routes = Router();

routes.use('/positions',positionRoutes);

module.exports= {
    routes
};