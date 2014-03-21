var result=require('../app/controllers/result');
var votes=require('../app/controllers/votes');


module.exports=function(app){


	app.get('/', result.index);
	app.get('/vote', votes.index);

	app.get('/roll/:aspect', result.rollResult);
	app.get('/vote/:aspect/:competitor', votes.updateVote);



};