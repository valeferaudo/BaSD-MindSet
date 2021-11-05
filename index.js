const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send("It's working properly! :)");
});
app.listen(3000, () => {
  console.log('Server listening at port 3000');
});