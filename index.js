const express = require('express');
const clients = require('./controllers/clients.js');
const counselors = require('./controllers/counselors.js');

// index
const app = express();
app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});

// Counselors
app.get('/counselors', counselors.getCounselors);
app.get('/counselors/country/:country', counselors.getCounselorsByCountry);
app.get('/counselors/id/:id', counselors.getCounselorsById);
app.get('/counselors/add', counselors.createCounselor);
app.get('/counselors/delete/:id', counselors.deleteCounselor);
app.get('/counselors/update/:id', counselors.updateCounselor);

// Clients

app.get('/clients', clients.getClients);
app.get('/clients/company_type/:company_type', clients.getClientsByCompanyType);
app.get('/clients/id/:id', clients.getClientsById);
app.get('/clients/add', clients.createClient);
app.get('/clients/delete/:id', clients.deleteClient);
app.get('/clients/update/:id', clients.updateClient);

app.listen(3000, () => {
  console.log('Server listening at port 3000');
});
