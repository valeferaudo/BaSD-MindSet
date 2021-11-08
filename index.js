const express = require('express');
const applications = require('./controllers/applications');

const app = express();


app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});

app.listen(3000, () => {
  console.log('Server listening at port 3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Get All Applications

app.get('/applications', applications.getAllApplications);

//Get Single Application By ID

app.get('/applications/id/:id', applications.getApplicationById);

//Get Single Application By Company ID

app.get('/applications/company_id/:id', applications.getApplicationByCompanyId);

//Get Single Application By Position ID

app.get('/applications/position_id/:id', applications.getApplicationByPositionId);

//Create Application

app.get('/applications/add', applications.createApplication);

//Modify Application

app.get('/applications/modify/:id', applications.modifyApplication);

//Delete Application

app.get('/applications/delete/:id', applications.deleteApplication);