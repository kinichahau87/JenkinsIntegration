var __kmModel = require("../../../kmSqlClient/src/kmModel");
var __poolClient = require("../../../kmSqlClient/src/dbManager")["pool1"];

var trigtest = new __kmModel.KModel({
			"id": 0,
			"message": "",
			"client_name": ""
		}, __poolClient, "trigtest");
		
module.exports = trigtest;