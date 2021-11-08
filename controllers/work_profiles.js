const express = require('express');
const port = 3000;
const app = express();

//Get all work profiles

const getAllWP = (req, res) => {
  const response = require('../data/work_profles.json');
  res.send(response);
};

