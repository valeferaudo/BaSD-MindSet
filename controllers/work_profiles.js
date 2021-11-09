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

const getWPByID = (req,res) => {
  const response = require('../data/work_profles.json');
  let idWP = response.filter(profile => profile.id == req.params.position_id);
  res.send(idWP);
};

module.exports= {
  getAllWP,
  getWPByName,
  getWPByID
};