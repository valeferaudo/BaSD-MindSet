const {Router} = require('express');
const { getAllWP, getWPByName } = require('../controllers/work_profiles');
const positionRoutes = Router();

positionRoutes.get('/',getAllWP);
positionRoutes.get('/:position_name',getWPByName);

module.exports= {
    positionRoutes
}