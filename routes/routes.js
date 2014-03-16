var result=require('../app/controllers/result');
var votes=require('../app/controllers/votes');


module.exports=function(app, emitter){

	var setEmitter=function(req, res, next){
		if(!req.emitter){
			req.emitter=emitter;
		}

		next();
	};

	app.get('/', setEmitter, result.index);
	app.get('/vote', setEmitter, votes.index);

	app.get('/roll/:aspect/:competitor', setEmitter, result.rollResult);
	app.get('/vote/:aspect/:competitor', setEmitter, votes.updateVote);



};