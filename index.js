const express = require('express');
const interviews = require('./controllers/interviews.js');
const positions = require('./controllers/positions.js');

const app = express();
app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});
app.listen(3000, () => {
  console.log('Server listening at port 3000');
});
//MICA
//Interviews
app.get('/interviews', interviews.getInterviews);
app.get('/interview/ByJobTitle/:job_title', interviews.getInterviewsByJobTitle);
app.get('/interview/ByCompany/:company_name', interviews.getInterviewsByCompany);
app.get('/interviews/add', interviews.createInterview);
app.get('/interviews/update/:id', interviews.updateInterview);
app.get('/interviews/delete/:id', interviews.deleteInterview);
//Positions
app.get('/positions', positions.getAllPositions);
app.get('/position/ByJobTitle/:job_title', positions.getPositionsByJobTitle);
app.get('/positions/add', positions.createJobPosition);
app.get('/positions/update/:id', positions.updatePosition);
app.get('/positions/delete/:id', positions.deletePosition);