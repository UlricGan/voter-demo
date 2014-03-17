var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost/votedb');
var demo=require('../demo.json');

var voteSchema=new Schema({
	aspect: String,
	competitors: [String, String],
	vote: [Number, Number]
});

voteSchema.statics.getAll=function(callback){
	this.find(function(err, votes){
		if(err){
			callback(err);
		}
		callback(null, votes);
	});
};

voteSchema.statics.getOne=function(name,callback){
	this.findOne({aspect: name}, function(err, vote){
		if(err){
			callback(err);
		}
		callback(null, vote);
	});
};

voteSchema.statics.add=function(name, competitor, callback){
	this.findOne({aspect: name}, function (err, result){
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

var VoteModel=mongoose.model('Vote', voteSchema);
module.exports=VoteModel;

//demo

VoteModel.getAll(function(err, result){
	console.log(result);
	if(result.length===0){
		VoteModel.create(demo, function(err){
			console.log('demo is builded');
		});
	}
});