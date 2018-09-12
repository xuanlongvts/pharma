const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const routes = require('./router');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes.config(app);

app.listen(port);
