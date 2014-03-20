$(document).ready(function(){

	var socket = io.connect('http://localhost');

	if(document.title==='Vote Result'){
		socket.on('roll', function(aspect, competitor){
			var $target=$('#'+aspect+'-result .result-num');
			if(!$target) return;
			var url='/roll/'+aspect;
			$.ajax(url).done(function(data){
				$target.find('span[cop="'+competitor+'"]').text(data.nums[competitor]);
				$target.find('span[cop="'+(1-parseInt(competitor))+'"]').text(data.nums[(1-parseInt(competitor))]);
				$target.find('td:first-child').text(data.nums[0]+data.nums[1]);
			});
		});
	}

	$('.vote-main').on('click', 'a', function(){
		var competitor=$(this).attr('vote-cop'),
			aspect=$(this).attr('vote-aspect'),
			$result=$(this).parent(),
			$leftResult=$(this).parent().find('.vote-left .vote-result'),
			leftResultNum=parseInt($leftResult.text()),
			$rightResult=$(this).parent().find('.vote-right .vote-result'),
			rightResultNum=parseInt($rightResult.text()),
			_this=this;
			url='/vote/'+aspect+'/'+competitor;
		$.ajax(url).done(function(data){
			if(data.notChange) return;
			if(!$result.hasClass('is-show')){
				$result.addClass('is-show');
			}
			$result.find('.is-selected').removeClass('is-selected');
			$(_this).addClass('is-selected');
			$leftResult.text(leftResultNum+data[0]);
			$rightResult.text(rightResultNum+data[1]);
		});
	});


});