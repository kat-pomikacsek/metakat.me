import '../css/index.scss';

var $topLink = $('.to-top');

function showTopLink(){
	$topLink.fadeIn(250);
}

function hideTopLink(){
	$topLink.fadeOut(250);
}


function initTopLink() {
	$(window).on('scroll', function (event) {
		var $win = $(this);
		var scrollThreshold = $('#tagline').offset().top;
		
		if($win.scrollTop() > scrollThreshold) {
			showTopLink();
		} else {
			hideTopLink();
		}
	});	
}

if($(window).width() < 720) {
	initTopLink();
}
