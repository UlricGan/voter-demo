var VoteModel=require('../models/vote');


var index=function(req, res){
	VoteModel.getAll(function(err, votes){
		var result={
			title: 'Vote Result',
			main: votes
		};
		res.render('index', result);
	});
};

var rollResult=function(req, res){
	var aspect=req.params.aspect;
	VoteModel.getOne(aspect, function(err, result){
		var voteNums={
			nums: result.vote
		};
		res.send(voteNums);
	});
};

exports.index=index;
exports.rollResult=rollResult;