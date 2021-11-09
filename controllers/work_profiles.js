//Get all work profiles

const getAllWP = (req, res) => {
  const response = require('../data/work_profles.json');
  res.send(response);
};

const getWPByName = (req, res) => {
  const response = require('../data/work_profles.json');
  let nameWP = response.filter(profile => profile.position_name == req.params.position_name);
  res.send(nameWP);
};

module.exports= {
  getAllWP,
  getWPByName
};