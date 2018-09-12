const fs = require('fs');

module.exports = {
    config: function(app) {
        const sourceFile = __dirname + '/data.json';

        app.get('/list', function(req, res) {
            fs.readFile(sourceFile, 'utf-8', function(err, data) {
                var parseData = JSON.parse(data);
                var dataArr = [];

                for (var key in parseData) {
                    dataArr.push(parseData[key]);
                }

                res.setHeader('Access-Control-Allow-Origin', '*');
                // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                // res.setHeader('Access-Control-Allow-Credentials', true);

                res.status(200).send({
                    data: dataArr
                });
            });
        });

        app.put('/create/:id', function(req, res) {
            res.end('create ' + req.params.id);
            // read(res);
        });

        app.post('/update/:id', function(req, res) {
            res.end('update: ' + req.params.id);
            // create(req.body, res);
        });

        app.delete('/delete/:id', function(req, res) {
            fs.readFile(sourceFile, 'utf8', function(err, data) {
                var dataCurr = JSON.parse(data);

                delete dataCurr['box' + req.params.id];

                fs.writeFileSync(sourceFile, JSON.stringify(dataCurr));
            });

            res.status(200).send('delete: ' + req.params.id);
            // res.end('delete: ' + req.params.id);
            // delete(req.params.id, res);
        });
    }
};
