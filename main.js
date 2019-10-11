var express = require('express');
var app = express();
var http = require('http').Server(app);
const Octokit = require('@octokit/rest');
var bodyParser = require('body-parser');

// var ipv4 = constants.ipv4;
// var fport = constants.port;

const ORGANIZATION = "";
const TOKEN = ""

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

var client = Octokit({
    auth: TOKEN
});

app.post('/input_data',(req,res) => {
    if(req.body.handle == "") res.redirect('back'); 
    var invStatus = client.orgs.createInvitation({
        org: ORGANIZATION,
        email: req.body.email
    });
    console.log("Invitation sent to" + req.body.handle + "At : " + req.body.email);
    res.send("Invitation sent to" + req.body.handle + "At : " + req.body.email);
});

/*
var user = client.users.getByUsername({
    username:"ionicc"
}).then(console.log(user));
*/

http.listen(3000,function(){
    console.log('listening on : 3000');
});