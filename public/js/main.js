var $box = $("#placeholder-box");
var $box_left = $box.offset().left;
var timer1;
$(document).ready(function() {
	$box.draggable({
		revert: true,
		containment: [-300,0,300,100],
	});

	timer1 = setInterval(function() {
		checkForSwipe()
	}, 50);
});

function checkForSwipe() {
	if ($box.offset().left > $box_left + $box.width()) {
		console.log('Swiped Right!');
		clearInterval(timer1);
		wait();
	} else if ($box.offset().left < $box_left - $box.width()) {
		console.log('Swiped Left!');
		clearInterval(timer1);
		wait();
	}
}

function wait() {
	// Recheck for swipe after waiting for 2 seconds
	window.setTimeout(function() {
		timer1 = setInterval(function() {
			checkForSwipe()
		}, 50);
	}, 2000);
}