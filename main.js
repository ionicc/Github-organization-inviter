var express = require('express');
var app = express();
const Octokit = require('@octokit/rest');

// var ipv4 = constants.ipv4;
// var fport = constants.port;

const octoToken = "";
const orgName = "";

var client = Octokit({
    auth: octoToken
});

client.orgs.createInvitation({
    org: orgName,
    email: ""
});
console.log(client);

