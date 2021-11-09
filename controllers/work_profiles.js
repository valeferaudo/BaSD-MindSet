const fs = require('fs');

//This function returns all work profiles

const getAllWP = (req, res) => {
  const response = require('../data/work_profiles.json');
  res.send(response);
};

//This function returns all positions by name

const getWPByName = (req, res) => {
  const response = require('../data/work_profiles.json');
  let nameWP = response.filter(profile => profile.position_name == req.params.position_name);
  res.send(nameWP);
};

//This function returns all positions by id

const getWPByID = (req,res) => {
  const response = require('../data/work_profiles.json');
  let idWP = response.filter(profile => profile.id == req.params.position_id);
  res.send(idWP);
};

//This function deletes one row by id and overwrites json file

const deleteUpdateWP = (req,res) =>{
  const filepath = './data/work_profiles.json';
  const fileObject = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const deleteWP = fileObject.filter(profile => profile.id != req.params.id);
  fs.writeFileSync(filepath,JSON.stringify(deleteWP,null,2),'utf8');
  res.send(deleteWP);
};

module.exports= {
  getAllWP,
  getWPByName,
  getWPByID,
  deleteUpdateWP
};