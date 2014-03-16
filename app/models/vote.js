var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost/votedb');

var voteSchema=new Schema({
	aspect: String,
	competitors: [String, String],
	vote: [Number, Number]
});

var VoteModel=mongoose.model('Votes', voteSchema);

var Vote=function(vote){
	
};

Vote.prototype.getAll=function(callback){
	VoteModel.find(function(err, votes){
		if(err){
			callback(err);
		}
		callback(null, votes);
	});
};

Vote.prototype.getOne=function(name,callback){
	VoteModel.findOne({aspect: name}, function(err, vote){
		if(err){
			callback(err);
		}
		callback(null, vote);
	});
};

Vote.prototype.add=function(name, competitor, callback){
	VoteModel.findOne({aspect: name}, function (err, result){
		if (err) {
			callback(err);
		}
		result.vote[competitor]++;
		result.markModified('vote');
		result.save(function(err, aaa){
			if(err){
				callback(err);
			}
			callback(null, result);
		});
	});
};

module.exports=Vote;