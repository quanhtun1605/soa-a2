var express = require('express');
var bodyParser = require('body-parser');
var SQL = require('./mysqlFunctions');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var port = 8080;

app.listen(port);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({	extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({
    secret : "secret",
    saveUninitialized: true,
    resave: true
}));

console.log('Server started! At http://localhost:' + port);

var sess;

app.post('/login', function (req, res) {
    console.log("/login");
    sess = req.session;
    var username = req.body.username;
    var password = req.body.password;
    SQL.login(username, password, function (err, result, userID) {
        if (userID != null) sess.userID = userID;
        res.send(result);
        console.log(result);
        console.log(sess.userID);
    });
});

app.get('/classInfo', function (req, res) {
   console.log("/classInfo");
   var userID = sess.userID;
   SQL.classInfo(userID, function (err, result) {
        res.send(result);
        console.log(result);
   })
});

app.get('/checkNoti', function (req, res) {
    console.log("/checkNoti");
    var userID = sess.userID;
    SQL.checkNoti(userID, function (err, result) {
        res.send(result);
        console.log(result);
    })
});

app.get('/checkSendNoti', function (req, res) {
    console.log("/checkSendNoti");
    var userID = sess.userID;
    SQL.checkSendNoti(userID, function (err, result) {
        res.send(result);
        console.log(result);
    })
});

app.post('/formInput', function (req, res) {
   console.log("/formInput");
   var userID = sess.userID;
   var studyingPoint = req.body.studyingPoint;
   var regulationsPoint = req.body.regulationsPoint;
   var socialPoint = req.body.socialPoint;
   var otherPoint = req.body.otherPoint;

   SQL.formInput(userID, studyingPoint, regulationsPoint, socialPoint, otherPoint, function (err, result) {
       res.send(result);
       console.log(result);
   })
});

app.post('/sendNoti', function (req, res) {
   console.log("/sendNoti");
   var userID = sess.userID;
   var receiverID = req.body.receiverID;
   var message = req.body.message;
   SQL.sendNoti(userID, receiverID, message, function (err, result) {
       res.send(result);
       console.log(result);
   })
});

app.get('/classList', function (req, res) {
   console.log("/classList");
   var userID = sess.userID;
   SQL.classList(userID, function (err, result) {
       res.send(result);
       console.log(result);
   })
});

app.get('/sendClassList', function (req, res) {
   console.log("/sendClassList");
   var userID = sess.userID;
   SQL.sendClassList(userID, function (err, result) {
       res.send(result);
       console.log(result);
   })
});

app.get('/complete', function (req, res) {
   console.log("/compelte");
   var userID = sess.userID;
   SQL.complete(userID, function (err, result) {
       res.send(result);
       console.log(result);
   })
});

app.post('/sendMultipleNotis', function (req, res) {
   console.log("/sendMultipleNotis");
   var userID = sess.userID;
   var message = req.body.message;
   SQL.sendMultipleNotis(userID, message, function (err, result) {
       res.send(result);
       console.log(result);
   })
});

app.get('/checkForm', function (req, res) {
    console.log("/checkForm");
    var userID = sess.userID;
    SQL.checkForm(userID, function (err, result) {
        res.send(result);
        console.log(result);
    })
});

