const {Router} = require('express');
const { getAllWP, getWPByName, getWPByID } = require('../controllers/work_profiles');
const positionRoutes = Router();

positionRoutes.get('/',getAllWP);
positionRoutes.get('/name/:position_name',getWPByName);
positionRoutes.get('/id/:position_id',getWPByID);

module.exports= {
    positionRoutes
}