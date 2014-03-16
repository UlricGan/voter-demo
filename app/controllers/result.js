var Vote=require('../models/vote');


var index=function(req, res){
	var vote=new Vote();
	vote.getAll(function(err, votes){
		var result={
			title: 'Vote Result',
			main: votes
		};
		res.render('index', result);
	});
};

var rollResult=function(req, res){
	var aspect=req.params.aspect;
	var competitor=req.params.competitor;
	var vote=new Vote();
	vote.getOne(aspect, function(err, result){
		var nums={
			num: result.vote[competitor]
		};
		res.send(nums);
	});
};

exports.index=index;
exports.rollResult=rollResult;