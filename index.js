const express = require('express');
const { routes } = require('./routes');
const app = express();

app.listen(3000, () => {
  console.log('Server listening at port 3000');
});

app.use('',routes);

