const express = require("express");
//const pool = require("../../kmSqlClient/src/dbManager").init("pool1");
//const trigModel = require("./models/trigtest.js");
var path = require("path");
var jobs = require("./routes/jobs");
var bodyParser = require("body-parser");
const app = express();



app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({
	limit: 524288000
}));
app.use(bodyParser.urlencoded({
	limit: 524288000,
	extended: true
}));

app.use("/", jobs);


process.on("SIGTERM", function() {
	console.log("shuting down");
});

app.listen(3000, function() {
	console.log("starting server");
});