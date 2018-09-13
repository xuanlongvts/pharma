const fs = require('fs');
const path = require('path');
const Git = require('nodegit');

const rimraf = require('rimraf');

// https://github.com/xuanlongvts/Git_Demo.git
// git@github.com:xuanlongvts/Git_Demo.git

// const nameBranchReq = 'mw-test-2';
// const nameBranchReq = 'mw-menu-fix'

// git@github.com:pharmacity/Ecommerce-Web.git
// https://github.com/pharmacity/Ecommerce-Web.git
const gitUrl = 'https://github.com/xuanlongvts/Git_Demo.git';
let gitLocal = '../listBoxs/box';
const gitCloneOpts = {};

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
            let { id, nameBranch, des } = req.body;

            var newBox = {
                id,
                nameBranch,
                link: `http://box${id}.demo.pharma.io`,
                des,
                createDate: dateCreated
            };

            gitLocal = `../listBoxs/box${id}`;

            Git.Clone(gitUrl, gitLocal, gitCloneOpts)
                .then(function(repo) {
                    repo.getBranch('refs/remotes/origin/' + nameBranch).then(function(reference) {
                        // console.log('Cloned ' + path.basename(gitUrl) + ' to ' + repo.workdir());

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

                        return repo.checkoutRef(reference);
                    });
                })
                .catch(function(err) {
                    console.log('err: ', err);
                });
        });

        app.post('/update/:id', function(req, res) {
            let getNameBranch = req.body.nameBranch;
            let getId = req.params.id;

            gitLocal = `../listBoxs/box${getId}`;

            rimraf(`${gitLocal}`, function(err) {
                if (err) console.log('err: ', err);
            });

            Git.Clone(gitUrl, gitLocal, gitCloneOpts).then(function(repo) {
                repo.getBranch('refs/remotes/origin/' + getNameBranch).then(function(reference) {
                    return repo.checkoutRef(reference);
                });
            });

            res.end('update: ' + req.params.id);
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

            rimraf(`${gitLocal}${id}`, function(err) {
                if (err) console.log('err: ', err);

                console.log(`Successfully deleted a directory ${gitLocal}${id}`);
            });

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
