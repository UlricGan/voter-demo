var VoteModel=require('../models/vote');

var index=function(req, res){
	VoteModel.getAll(function(err, votes){
		votes.forEach(function(value){
			var isAspect=value.aspect;
			value.hasVote= req.session[isAspect];
		});
		var result={
			title: 'Vote',
			main: votes
		};
		res.render('vote', result);
	});
};

var updateVote=function(req, res){
	var aspect=req.params.aspect;
	var competitor=parseInt(req.params.competitor);
	var result={};
	console.log(req.session);
	if(!req.session.hasOwnProperty(aspect)){
		VoteModel.add(aspect, competitor, function(err, data){
			req.emitter.emit('change', aspect, competitor);
		});
		result[competitor]=1;
		result[(1-competitor)]=0;
		req.session[aspect]=competitor;
	}else{
		if(req.session[aspect]!=competitor){
			VoteModel.balance(aspect, competitor, function(err, data){
				req.emitter.emit('change', aspect, competitor);
			});
			result[competitor]=1;
			result[1-competitor]=-1;
			req.session[aspect]=competitor;
		}else{
			result.notChange=true;
		}
	}
	res.send(result);
};

exports.index=index;
exports.updateVote=updateVote;