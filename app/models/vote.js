var mongoose=require('mongoose');
var config=require('../../config');
var demo=require('../demo.json');

var Schema=mongoose.Schema;
mongoose.connect('mongodb://'+config.host+'/'+config.db);

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

voteSchema.statics.balance=function(name, competitor, callback){
	this.findOne({aspect: name}, function (err, result){
		if(err) {
			callback(err);
		}
		result.vote[competitor]++;
		result.vote[(1-competitor)]--;
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

//demo

VoteModel.getAll(function(err, result){
	if(result.length===0){
		VoteModel.create(demo, function(err){
			console.log('demo is builded');
		});
	}
});

module.exports=VoteModel;