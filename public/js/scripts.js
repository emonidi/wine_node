
$(document).ready(function(){
	$('.carousel').carousel();

	$('.carousel').carousel().on('slide',function(){

	})

	$(".service-image").hover(
		function(){
			$(this).parent().find($('.service-image-border')).show();
		}
	)
});