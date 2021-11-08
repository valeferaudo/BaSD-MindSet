const Postulants = require('./controllers/postulants.js');
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});
app.listen(3000, () => {
  console.log('Server listening at port 3000');
});

//POSTULANTS
app.get('/postulants', Postulants.getPostulants);
app.get('/postulants/:id', Postulants.getPostulantsById);
app.get('/postulants/byLastName/:last_name', Postulants.getPostulantsByLastName);
app.get('/postulants/add', Postulants.addPostulant);
app.get('/postulants/update/:id', Postulants.updatePostulant);
app.get('/postulants/delete/:id', Postulants.deletePostulant);