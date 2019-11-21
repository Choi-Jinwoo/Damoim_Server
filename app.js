const express = require('express');
const app = express();
const model = require('./model');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', api);

app.listen(3000, () => {
  console.log('SERVER IS RUNNING AT PORT 3000');
});
