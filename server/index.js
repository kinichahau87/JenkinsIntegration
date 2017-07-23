const express = require("express");
const pool = require("../../kmSqlClient/src/dbManager").init("pool1");
const trigModel = require("./models/trigtest.js");
const app = express();


app.get("/", function(req, res) {
	var findPromise = trigModel.find();
	findPromise.then(results => {
		res.send(results);
	}).catch(err => {
		res.send(err);
	});
});

process.on("SIGTERM", function() {
	console.log("shuting down")
	pool.shutdown(function() {
		process.exit();
	});
});

app.listen(3000, function() {
	console.log("starting server");
});