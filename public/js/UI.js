$(function(){
	$('.gamenu .plane').on('click', function(){
		var plane = $(this).data('plane');
		console.log(plane);
		planeMaker.switch(plane);
		$('.gamenu').fadeOut();
	})
})