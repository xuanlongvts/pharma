const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./router');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/listbox', function(req, res) {
//     fs.readFile(__dirname + '/data.json', 'utf-8', function(err, data) {
//         res.end(data);
//     });
// });

routes.config(app);

app.listen(port);
