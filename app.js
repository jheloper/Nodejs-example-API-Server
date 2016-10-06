const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/users', require('./api/user'));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');

  require('./models').sequelize.sync({force: true}).then(() => {
    console.log('Database Sync...');
  })
});

module.exports = app;
