#!/usr/bin/env nodejs
var express = require("express");
var app = express();
var http = require("http").Server(app);
const Octokit = require("@octokit/rest");
var bodyParser = require("body-parser");
var expressIp = require("express-ip");
require("dotenv").config();

/*
------------------------------
CREATE A .ENV FILE IN THE ROOT OF THIS PROJECT
ENTER YOUR ORGANIZATION NAME
AND
ENTER YOUR GITHUB ACCESS TOKEN
THEY WILL BE IMPORTED BELOW
------------------------------
*/

const ORGANIZATION = process.env.ORGANIZATION;
const TOKEN = process.env.TOKEN;

var PORT = 8000 || process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressIp().getIpInfoMiddleware);

app.set("PORT", PORT);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  const userInfo = req.ipInfo;
  console.log(`User connected from ${userInfo.city}, ${userInfo.country}`);
  console.log(`User details = ${userInfo}`);
});

app.get("/input_data", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
var client = Octokit({
  auth: TOKEN
});

app.post("/input_data", (req, res) => {
  if (req.body.handle == "") res.redirect("back");
  client.users
    .getByUsername({
      username: req.body.handle
    })
    .then(userdata => {
      var invStatus = client.orgs.createInvitation({
        org: ORGANIZATION,
        email: req.body.email
      });
      console.log(userdata);
      console.log(
        "Invitation sent to " + req.body.handle + " At : " + req.body.email
      );
      res.send(
        "Invitation sent to " + req.body.handle + " At : " + req.body.email
      );
    })
    .catch(error => {
      console.log("User not found", error);
      res.redirect("back");
    });
});

http.listen(app.get("PORT"), function() {
  console.log("listening on : " + app.get("PORT"));
});
