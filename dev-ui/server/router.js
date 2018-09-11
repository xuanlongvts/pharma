const fs = require('fs');

module.exports = {
    config: function(app) {
        const sourceFile = __dirname + '/data.json';

        app.get('/list', function(req, res) {
            fs.readFile(sourceFile, 'utf-8', function(err, data) {
                res.status(200).send({
                    data: JSON.parse(data)
                });
                // res.end(data);
            });
            // get(res);
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
