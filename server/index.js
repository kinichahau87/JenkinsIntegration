const express = require("express");
var path = require("path");
var jobs = require("./routes/jobs");
var bodyParser = require("body-parser");
var env = require("node-env-file");
const app = express();


env(__dirname + "/.env");

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({limit: 524288000}));
app.use(bodyParser.urlencoded({limit: 524288000, extended: true}));

app.use("/", jobs);


process.on("SIGTERM", function() {
	console.log("shuting down");
});

app.listen(3000, function() {
	console.log(process.env.jenkinsCrumb);
	console.log("starting server");
});
