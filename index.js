const express = require('express');
const sessions = require('./controllers/sessions')

const app = express();
app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});
app.listen(3000, () => {
  console.log('Server listening at port 3000');
});

// Sessions
app.get('/sessions', sessions.getAllSessions);
app.get('/sessions/searchById/:id', sessions.getSessionById);
app.get('/sessions/add', sessions.createNewSession);
app.get('/sessions/update/:id', sessions.editSessionById);
app.get('/sessions/delete/:id', sessions.deleteSessionById);
app.get('/sessions/searchByPostulant/:postulant_id', sessions.getSessionByPostulantId);
app.get('/sessions/searchByCouncelor/:councelor_id', sessions.getSessionByCouncelorId);
app.get('/sessions/searchByAccomplished/:accomplished', sessions.getSessionByAccomplishedState);
