var Vote=require('../models/vote');

var index=function(req, res){
	var vote=new Vote();
	vote.getAll(function(err, votes){
		var result={
			title: 'Vote',
			main: votes
		};
		res.render('vote', result);
	});
};

var updateVote=function(req, res){
	var aspect=req.params.aspect;
	var competitor=req.params.competitor;
	var vote=new Vote();
	vote.add(aspect, competitor, function(err, result){
		res.send(result.vote);
		req.emitter.emit('change', aspect, competitor);
	});
};

exports.index=index;
exports.updateVote=updateVote;