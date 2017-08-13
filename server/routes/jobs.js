var express = require("express");
var router = express.Router();
var __promise = require("promise");
var config = require("config");
var jenkinsapi = require("jenkins-api");
var http = require("http");
var urlencode = require("urlencode");
var jenkins = null;

var initString = [];
initString.push(config.get("jenkins.protocol"));
initString.push(":/");
initString.push("/");
initString.push(config.get("jenkins.user"));
initString.push(":");
initString.push(config.get("jenkins.secret"));
initString.push("@");
initString.push(config.get("jenkins.host"));
jenkins = jenkinsapi.init(initString.join(""));


router.get("/", function(req, res) {
	var aPromise = new __promise(function(resolve, reject) {
		jenkins.all_jobs(function(err, results) {
			if (err) {
				reject(err);
			}
			resolve(results);
		});
	});

	aPromise.then((results) => {
		var jobs = [];
		for (var i = 0; i < results.length; i++){
			if (results[i].hasOwnProperty("name")){
				jobs.push({"name":results[i].name.toUpperCase(), "index": (i + 1)});
			}
		}
		res.render("index", {
			jobs: jobs
		});
	}).catch((reason) => {
		res.render("index", {
			jobs: reason

		});

	});
});//end of get

router.get("/job-detail",function(req, res){
	var aPromise = new __promise(function(resolve, reject){
		jenkins.job_info(req.query.name, function(err, data){
			if (err){
				reject(err);
			}
			resolve(data);
		});
	});

	aPromise.then((results) => {
		res.send(results);
	}).catch((reason) => {
		res.send(reason);
	});
});

router.post("/job-start", function(req, res){
	var aPromise = new __promise(function(resolve, reject){
		var postData = JSON.stringify({"token": config.get("jenkins.jobToken")});
		var __bpath = "/jenkins/job/" + urlencode(req.body.name) + "/build?token=" + config.get("jenkins.jobToken");
		var raHost = config.get("jenkins.rawHost");
		var lHeaders = {"Content-Type": "application/json", "Content-Length": Buffer.byteLength(postData), "Jenkins-Crumb": process.env.jenkinsCrumb, "Authorization": "Basic " + Buffer(config.get("jenkins.user") + ":" + config.get("jenkins.secret")).toString("base64")};
		const __options = {
			"hostname": raHost,
			"path": __bpath,
			"method": "POST",
			"port": "8080",
			"headers": lHeaders
		};
		console.log(__options);
		var hpReq = http.request(__options, (response) => {
			let str = "";
			response.on("data", function(chunk){
				console.log(chunk);
				str += chunk;
			});

			response.on("end", function(){
				console.log(str);
				resolve(str);
			});

			response.on("error", function(e){
				console.log(e);
				reject(e);
			});
		});
		hpReq.write(postData);
		hpReq.end();
	});

	aPromise.then((results) => {
		res.send(results);
	}).catch((reason) => {
		res.send(reason);
	});
});

module.exports = router;
