const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const fs = require("fs");
const pathURL = './questions.json'
const path = require('path');
const { response } = require("express");
console.log(path.join);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});
app.get('/ask', (req, res) => {
    // console.log(req.url);
    res.sendFile(path.resolve('./public/ask.html'));

});

app.get('/question-detail/:id', (req, res) => {
    res.sendFile(path.resolve('./public/question-detail.html'));

});

app.get("/api/v1/questions/:id", (req, res) => {
    let parameters = req.params.id;
    fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        else {
            dataParse = JSON.parse(data);
            let users = dataParse.find(user => user.id.toString() === parameters)
            console.log(JSON.stringify(users));
            let usersJSON = JSON.stringify(users);
            if (users) {
                res.status(200).json(usersJSON);
            }
            else {
                res.status(500).json(usersJSON);
            }
        }
    })
});

app.get("/api/v1/questions", (req, res) => {
    fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        else {
            res.json(data);
        }
    })
});

app.put("/api/v1/questions", (req, res) => {
    let reqBody = req.body;
    console.log("reqBody>>>", reqBody);
    fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        else {
            let dataParse = JSON.parse(data);
            let question = dataParse.find(index => index.id.toString() === reqBody.id);
            if (question) {
                Object.assign(question, reqBody)
                fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
                    if (err) throw err;
                    else {
                        res.status(200).json("Put successfully");
                    }
                })
            }
            else if (!question) {
                res.status(505).json("Not found");
            }
            else {
                res.status(404).json("404 Not Found");
            };
        };
    });
});

app.post('/api/v1/questions', (req, res) => {
    let reqBody = req.body;
    fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
        if (err) throw err;
        else {
            let dataParse = JSON.parse(data);
            let users = dataParse.find(user => user.id === reqBody.id);
            if (!users) {
                dataParse.push(reqBody);
                console.log(dataParse);
                fs.writeFile(pathURL, JSON.stringify(dataParse), (err) => {
                    if (err) throw err;
                    else {
                        res.status(200).json("Post successfully");
                    }
                });
            }
            else {
                console.log("aaaa");
                res.status(500).json("Not found");
            }
        }
    });
});
app.get("*", (req, res) => {
    res.json("PAGE NOT FOUND");
});
// app.get('/ask', (req, res) => {
//     res.sendFile(path.resolve('../public/ask.html'));
// });
// app.get('/ask', (req, res) => {
//     res.sendFile(path.resolve('../public/ask.html'));
// });
// app.get('/ask', (req, res) => {
//     res.sendFile(path.resolve('../public/ask.html'));
// });





// baitap 4:
// const checkExistId = (req, res, next) => {
//     let parameters = req.params;
//     let formbody = req.body;
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParser = JSON.parse(data);
//             let question = dataParser.find(postion => postion.id.toString() === formbody.id);
//             console.log("id",question);
//             if (question) {
//                 next();
//             }
//             else{
//                 res.status(404).json("Question not found");
//             };
//         };
//     });

// };
// const checkExistContent = (req, res, next) => {
//     let parameters = req.params;
//     let formbody = req.body;
//     console.log("formbody", formbody.content);
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParser = JSON.parse(data);
//             let question = dataParser.find(postion => postion.content === formbody.content);
//             console.log("question",question);
//             if(question){
//                 res.status(200).json("Question already exists");
//             }
//             else{
//                 next();
//             };
//         };
//     });
// };

// app.get("/api/v1/questions/:abc", checkExistId, checkExistContent, (req, res) => {
//     res.status(200).json("Hello world");
// });
// app.post("/api/v1/questions", checkExistId, checkExistContent, (req, res) => {
//     res.status(200).json("Hello world");
// });
// app.put("/api/v1/questions/:id", checkExistId, checkExistContent, (req, res) => {
//     res.status(200).json("Hello world");
// });
// app.delete("/api/v1/questions/:id", checkExistId, checkExistContent, (req, res) => {
//     res.status(200).json("Hello world");
// });





// baitap 1-> 3:
// app.get("/api/v1/questions/:id", (req, res) => {
//     let idGet = req.params.id;
//     console.log("idGet", idGet);
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParser = JSON.parse(data);
//             let question = dataParser.find(user => user.id == idGet);
//             if (question) {
//                 res.status(200).json(question);
//             }
//             else {
//                 res.status(404).json("Not found");

//             }
//         }
//     })
// });
// app.post("/api/v1/questions", (req, res) => {
//     let body = req.body;
//     fs.readFile(pathURL, { encoding: "utf8" }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParser = JSON.parse(data);
//             let question = dataParser.find(user => user.content === body.content);
//             if (!question) {
//                 dataParser.push(body);
//                 fs.writeFile(pathURL, JSON.stringify(dataParser), (err) => {
//                     if (err) throw err;
//                     else {
//                         res.status(200).json("Create successfully")
//                     }
//                 });
//             }
//             else {
//                 res.status(404).json("Question already exists");
//             }
//         }
//     });
// });

// app.put("/api/v1/questions/:id", (req, res) => {
//     let body = req.body;
//     let parameters = req.params.id;
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParser = JSON.parse(data);
//             let question = dataParser.find(user => user.id == parameters);
//             console.log(question);
//             if (question) {
//                 Object.assign(question, body);
//                 console.log(dataParser);
//                 fs.writeFile(pathURL, JSON.stringify(dataParser), (err) => {
//                     if (err) throw err;
//                     else {
//                         res.status(200).json("Update successfully");
//                     }
//                 })
//             }
//             else {
//                 res.status(404).json("Not found question");
//             }
//         }

//     });
// });

// app.delete('/api/v1/questions/:id', (req, res) => {
//     let parameters = req.params.id;
//     fs.readFile(pathURL, { encoding: 'utf8' }, (err, data) => {
//         if (err) throw err;
//         else {
//             let dataParser = JSON.parse(data);
//             let question = dataParser.findIndex(user => user.id.toString() === parameters);
//             if (question !== -1) {

//                 console.log(typeof parameters);
//                 console.log(typeof dataParser[1].id);
//                 console.log( question);
//                 dataParser.splice(question, 1);
//                 fs.writeFile(pathURL, JSON.stringify(dataParser), (err) => {
//                     if (err) throw err;
//                     else {
//                         res.status(200).json("Delete successfully");
//                     }
//                 });

//             }
//             else if (question == -1) {
//                 res.status(404).json("Not found question");
//             }

//         }
//     })
// });






app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`)
});

