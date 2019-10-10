var express = require('express');
var app = express();
var http = require('http').Server(app);
const Octokit = require('@octokit/rest');

// var ipv4 = constants.ipv4;
// var fport = constants.port;

var constants = require("./lib/constant.js");

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

var client = Octokit({
    auth: constants.octoToken
});

/*
function user_exists(email) {
    client.
}

client.orgs.createInvitation({
    org: constants.orgName,
    email: ""
});
console.log(client);
*/
http.listen(3000,function(){
    console.log('listening on : 3000');
});

