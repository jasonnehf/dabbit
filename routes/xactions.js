'use strict';

var express = require('express');

var router = express.Router();

var Xaction = require('../models/Xaction');

router.get('/', function(req, res) {
	Xaction.get(function(err, xactions) {
		if (err) {
			res.status(400).send(err);
			return;
		}	else	{
			res.send(xactions);
		}
	});
});

router.get('/:id', function(req, res) {
	Xaction.get(function(err, xactions) {
		if (err) {
			res.status(400).send(err);
			return;
		}	else	{
			var getid=req.params.id;
			var getxaction=xactions.find(s=>s.uuid===getid);
			if(getxaction) {
				res.send(getxaction);
			}
			else
			{
				res.status(404).send({error:"xaction not found =("});
			}
		}
	});
});


router.post('/', function(req, res) {
	var newXaction = req.body;

	Xaction.create(newXaction, function(err) {
		if (err) {
			res.status(400).send(err);
		}	else {
			res.send();
		}
	});
});

router.delete('/:id', function(req, res) {
	Xaction.delete(req.params.id,function(err) {
		if(err) {
			res.status(400).send(err);
		}	else {
			res.send();
		}
	});
});

router.put('/:id',function(req,res){
	var id=req.params.id;
	var updatesObj=req.body;
	Xaction.update(id,updatesObj,function(err,updatedXaction) {
		if(err) {
			res.status(400).send(err);
		}
		else{
			res.send(updatedXaction);
		}
	})
});




module.exports = router;