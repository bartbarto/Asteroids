$(function(){
	$('.gamenu .plane').on('click', function(){
		var plane = $(this).data('plane');
		console.log(plane);
		planeMaker.switch(plane);
		planePicked = plane;

		$('.gamenu').fadeOut();
		$('.info').addClass('slide_down');
	})

	$('.choose_button').on('click', function(){
		var id = $(this).attr('id');
		$('.info .title').html('How do you play?')
		$('.back-button').show();
		switch(id){
			case 'socket' :
				// playingWithPhone = true;
				$('.buttons').hide();
				$('.chose_socket').show();
				// socketController.updateInstructions();
				break;
			case 'leap':
				// playingWithLeap = true;
				$('.buttons').hide();
				$('.chose_leap').show();
				controls.leapControl = true;
				break;
			case 'computer':
				// playingWithKeys = true;
				$('.buttons').hide();
				$('.chose_computer').show();
				break;
		}
	})

	$('.back-button').on('click', function(){
		$('.info .title').html('Which controller do you want to use?')
		$('.chose_socket').hide();
		$('.chose_leap').hide();
		$('.chose_computer').hide();

		$('.buttons').show();
		$('.back-button').hide()

		controls.leapControl = false;
	});

	$('.play').on('click', function(){
		game.start();
	})
})

function showNotification(text){
	$('.notification').html(text);

	$('.notification').addClass('active');
	setTimeout(function(){
		$('.notification').removeClass('active');
	}, 1500)
}