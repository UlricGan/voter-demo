$(document).ready(function(){

	var socket = io.connect('http://localhost');

	socket.on('roll', function(aspect, competitor){
		var url='/roll/'+aspect+'/'+competitor;
		$.ajax(url).done(function(data){
			var $target=$('#'+aspect+'-result .result-num');
			var otherNum=parseInt($target.find('span[cop="'+(1-competitor)+'"]').text());
			$target.find('span[cop="'+competitor+'"]').text(data.num);
			$target.find('td:first-child').text(data.num+otherNum);
		});
	});

	$('.vote-main').on('click', 'a', function(){
		var competitor=$(this).attr('vote-cop');
		var aspect=$(this).attr('vote-aspect');
		var url='/vote/'+aspect+'/'+competitor;
		$.ajax(url).done(function(){
			console.log('It has voted');
		});
	});


});