const express = require('express');
const Counselors = require('./controllers/counselors.js');

// index
const app = express();
app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});

// counselors
app.get('/counselors', Counselors.getCounselors);
app.get('/counselors/country/:country', Counselors.getCounselorsByCountry);
app.get('/counselors/id/:id', Counselors.getCounselorsById);
app.get('/counselors/add', Counselors.createCounselor);
app.get('/counselors/delete/:id', Counselors.deleteCounselor);
app.get('/counselors/update/:id', Counselors.updateCounselor);

// clients
app.get('/clients', (req, res) => {
  res.send("It's working properly! :)");
});


app.listen(3000, () => {
  console.log('Server listening at port 3000');
});
