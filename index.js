const express = require('express');
const admins = require('./controllers/admins')

const app = express();
app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});
app.listen(3000, () => {
  console.log('Server listening at port 3000');
});

// Admins
app.get('/admins', admins.getAllAdmins);
app.get('/admins/searchById/:id', admins.getAdminById);
app.get('/admins/searchByEmail/:email', admins.getAdminByEmail);
app.get('/admins/add', admins.createNewAdmin);
app.get('/admins/update/:id', admins.editAdminById);
app.get('/admins/delete/:id', admins.deleteAdminById);
