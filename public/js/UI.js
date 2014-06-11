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

	$('.score-submit').on('click', function(){

		$('.score-submit').hide();
		$('.game-over').append('<span class="score-message">Sharing Score</span>');

		var name = $('.user-name').val();
		var score = game.score;
		var plane = planePicked;
		var rings = game.totalRingsGame;
		var stars = game.totalStarsGame;
		var crashes = game.crashes;

		$.post( "http://kermisdatabasevanbartenrobbert.herokuapp.com/addhighscore/fly",
			{ 	name: name,
				score: score,
				plane: plane,
				rings: rings,
				stars: stars,
				crashes: crashes
			} )
		.done(function(){
			$('.score-submit').hide();
			$('.score-message').html('score succesully shared.')

		}).fail(function(){
			$('.score-message').html('something went wrong, please try again');
			$('.score-submit').show();
		});
	})
})

function showNotification(text){
	$('.notification').html(text);

	$('.notification').addClass('active');
	setTimeout(function(){
		$('.notification').removeClass('active');
	}, 1500)
}