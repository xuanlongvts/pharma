const fs = require('fs');

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

let dateCreated = `${day}/${month}/${year}`;

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

                res.status(200).send({
                    data: dataArr
                });
            });
        });

        app.put('/create/:id', function(req, res) {
            const { id, nameBranch, des } = req.body;

            var newBox = {
                id,
                nameBranch,
                link: `http://box${id}.demo.pharma.io`,
                des,
                createDate: dateCreated
            };

            // var stringifyNewBox = JSON.stringify(newBox);

            fs.readFile(sourceFile, 'utf-8', function(err, data) {
                var parseData = JSON.parse(data);
                delete parseData[id];
                parseData[id] = newBox;

                var dataArr = [];
                for (var key in parseData) {
                    if (parseInt(key, 10) === parseInt(id, 10)) {
                        dataArr.push(newBox);
                    } else {
                        dataArr.push(parseData[key]);
                    }
                }

                fs.writeFileSync(sourceFile, JSON.stringify(parseData));
                res.status(200).send({
                    data: dataArr
                });
            });
        });

        app.post('/update/:id', function(req, res) {
            res.end('update: ' + req.params.id);
            // create(req.body, res);
        });

        app.delete('/delete/:id', function(req, res) {
            const { id } = req.params;

            var newBox = {
                id: parseInt(id, 10),
                nameBranch: null,
                link: null,
                des: null,
                createDate: null
            };
            fs.readFile(sourceFile, 'utf8', function(err, data) {
                var parseData = JSON.parse(data);
                delete parseData[id];
                parseData[id] = newBox;

                var dataArr = [];
                for (var key in parseData) {
                    if (parseInt(key, 10) === parseInt(id, 10)) {
                        dataArr.push(newBox);
                    } else {
                        dataArr.push(parseData[key]);
                    }
                }

                fs.writeFileSync(sourceFile, JSON.stringify(parseData));

                res.status(200).send({
                    data: dataArr
                });
            });
        });
    }
};
