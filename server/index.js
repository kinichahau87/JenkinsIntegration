const express = require("express");
//const pool = require("../../kmSqlClient/src/dbManager").init("pool1");
//const trigModel = require("./models/trigtest.js");
const path = require("path");
const app = express();


app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/public/html/index.html"));
	
});

process.on("SIGTERM", function() {
	console.log("shuting down");
	
});

app.listen(3000, function() {
	console.log("starting server");
});