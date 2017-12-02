var $box = $("#placeholder-box");
var $box_left = $box.offset().left;
var timer1;
var labelX = [], labelY = [];

$(document).ready(function() {
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.legend.display = false;

	$box.draggable({
		revert: true,
		containment: [-$(window).width()/2 + $box.width()/2 + 20, 0, $(window).width()/2 - $box.width()/2 ,100],
	});

	timer1 = setInterval(function() {
		checkForSwipe()
	}, 50);

	$.ajax({
		url: 'https://api.iextrading.com/1.0/stock/aapl/chart',
		success: function(res) {
			// console.log(res);
			for (var i = 0; i < res.length; i++) {
				var date = res[i].date, closePrice = res[i].close;
				labelX.push(date);
				labelY.push(closePrice);
			}

			var ctx = document.getElementById("stockChart").getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labelX,
					datasets: [{
						data: labelY,
						fill: false,
						borderColor: '#9320a2',
						pointBackgroundColor: 'white',
					}]
				},
				options: {
					scales: {
						xAxes:[{
							scaleLabel: {
								display: true,
								labelString: 'Date',
							},
							ticks: {
								fontSize: 8,
							}
						}],
						yAxes: [{
							ticks: {
								callback: function(value, index, values) {
									return '$'+value;
								},
								fontSize: 8,
							},
							scaleLabel: {
								display: true,
								labelString: 'Price',
							}
						}]
					}
				}
			});
		},
	})
});

function checkForSwipe() {
	if ($box.offset().left + $box.width() > $(window).width() - 20) {
		console.log('Swiped Right!');
		clearInterval(timer1);
		wait();
	} else if ($box.offset().left < 10) {
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