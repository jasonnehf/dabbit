'use strict';

//	Xaction model
//	Contains methods to interact with transaction data

var fs = require("fs");
var path = require("path");
var uuid=require("uuid");

var dataFilePath = path.join(__dirname, '../data/xactions.json');



exports.get = function(callback) {
	fs.readFile(dataFilePath, function(err, data) {
		if (err) {
			return callback(err);
		}
		var xactions = JSON.parse(data);
		callback(null, xactions);
	});
}

exports.create = function(newXaction,cb) {
	this.get((err, xactions) => {
		if(err)	return cb(err);

		newXaction.uuid=uuid();
		xactions.push(newXaction);
		this.write(xactions,cb);
	});
}

exports.getbyid=function(id,foundXaction,cb){
	this.get((err,xactions) => {
		if(err) return cb(err);
		var foundXaction=xactions.find(x=>x.uuid===id);
	});
}

exports.write = function(xactions,cb) {
	fs.writeFile(dataFilePath,JSON.stringify(xactions),cb);
}

exports.delete = function(delid,cb) {
	this.get((err, xactions) => {

		if(err)	return cb(err);

		var xactionToDelete=xactions.find(x=>x.uuid===delid);
		var idxToDelete=xactions.indexOf(xactionToDelete);
		xactions.splice(idxToDelete,1);
		this.write(xactions,cb);
	});
}

exports.update = function(id,updatesObj,cb) {
	var updatedXaction;
	this.get((err,xactions)=> {
		xactions=xactions.map(xa => {
			if(xa.uuid===id) {
				for(var key in updatesObj) {
					xa[key]=updatesObj[key];
				}
				updatedXaction=xa;
				return updatedXaction;
			}
			return xa;
		});
		console.log(updatedXaction);
		if(!updatedXaction) {
			cb({err:"Xaction not found."});
			return;
		}

		this.write(xactions,function(err) {
			cb(err,updatedXaction)
		});


	});

}