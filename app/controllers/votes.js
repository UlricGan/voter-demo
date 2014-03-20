var VoteModel=require('../models/vote');

var index=function(req, res){
	VoteModel.getAll(function(err, votes){
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
		console.log('add!!********');
		VoteModel.add(aspect, competitor, function(err, data){
			result[competitor]=1;
			result[(1-competitor)]=0;
			req.emitter.emit('change', aspect, competitor);
		});
		req.session[aspect]=competitor;
	}else{
		if(req.session[aspect]!=competitor){
			console.log('balance!!********');
			VoteModel.balance(aspect, competitor, function(err, data){
				result[competitor]=1;
				result[1-competitor]=-1;
				req.emitter.emit('change', aspect, competitor);
			});
			req.session[aspect]=competitor;
		}else{
			console.log('notChange!!********');
			result.notChange=true;
		}
	}
	console.log(result);
	res.send(result);
};

exports.index=index;
exports.updateVote=updateVote;