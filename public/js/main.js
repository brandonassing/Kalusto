var $box = $("#placeholder-box");
var $box_left = $box.offset().left,
		$box_top = $box.offset().top;
var timer1;
var labelX = [],
    labelY = [];


var companyList = ['TSLA','BAC', 'GE', 'MU', 'F' ,'AMD', 'BRCD', 'AAPL', 'T' , 'WFC', 'BABA','CHK','SQ','TEVA',
 'MSFT','VZ','INTC','JPM','FHN','CMCSA','KO','DIS','SHOP'];
var company;
$(document).ready(function() {

	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 37) {
				//left arrow
				SwipeLeft();


		} else if (event.keyCode == 38) {
				//up arrow
				SwipeUp();
		} else if (event.keyCode == 39) {
				//right arrow
				SwipeRight();
		}
	});

	function refreshList(){

		$.get("/api/symbols", function(data){

			$( ".DocumentItem" ).remove();
				var symbol;
				for(var i in data){
					symbol = JSON.stringify(data[i].symbol).replace(/['"]+/g, '').toUpperCase();
					$("#liked-list").append('<li id="' + symbol + '-liked" class="DocumentItem"><h3 class="list-symbol-symbol">' + symbol + '</h3></li>');
					var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/quote";
					$.get(url, function(stockData){
						var name = JSON.stringify(stockData.companyName).replace(/['"]+/g, '');
						var price = JSON.stringify(stockData.latestPrice).replace(/['"]+/g, '');
						var priceChange = JSON.stringify(stockData.change).replace(/['"]+/g, '');
						var percentChange = JSON.stringify(stockData.changePercent).replace(/['"]+/g, '') * 100;
						var symbol = JSON.stringify(stockData.symbol).replace(/['"]+/g, '');

					$('#'+ symbol + '-liked').append('<div class="list-symbol-info"><i class="list-symbol-name">' + name + '</i></br><b>$' + price + '</b><p id="' + symbol + '-change"></p></div>');
					if (priceChange > 0) {
						$("#" + symbol + "-change").addClass('greenColor').html('($' + priceChange + ' / ' + percentChange + '%)');
					} else if (priceChange < 0) {
						$("#" + symbol + "-change").addClass('redColor').html('(-$' + priceChange.slice(1) + ' / ' + percentChange + '%)');;
					}
					else{
						$("#" + symbol + "-change").html('($' + priceChange + ' / ' + percentChange + '%)');;	
					}
							});
						}
				});
	}

	function addStockToDB(stock){
		$.ajax({
							'url': '/api/symbols',
							'type': 'POST',
							'data': {
									'symbol': stock
							},
							success: function (data) {
						}
					});
	}
	refreshList();
	$("#placeholder-box").draggable({
		revert: false,
	});

	$("#refresh").click(function(){
		refreshList();
	});
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.legend.display = false;

	$box.draggable({
		revert: true,
		containment: [-$(window).width()/2 + $box.width()/2 + 20, -50, $(window).width()/2 - $box.width()/2 ,100],
	});

	timer1 = setInterval(function() {
		checkForSwipe()
	}, 50);


	refreshView();
});

function checkForSwipe() {
<<<<<<< HEAD
    if ($box.offset().left + $box.width() > $(window).width() - 20) {
        console.log('Swiped Right!');
        SwipeRight();
        clearInterval(timer1);
        wait();
    } else if ($box.offset().left < 10) {
        console.log('Swiped Left!');
        SwipeLeft();
        clearInterval(timer1);
        wait();
    } else if ($box.offset().top - $box_top < -50) {
        console.log('Swiped Top!');
        SwipeUp();
        clearInterval(timer1);
        wait();
    }
=======
		if ($box.offset().left + $box.width() > $(window).width() - 20) {
				console.log('Swiped Right!');
				SwipeRight();
				clearInterval(timer1);
				wait();
		} else if ($box.offset().left < 10) {
				console.log('Swiped Left!');
				SwipeLeft();
				clearInterval(timer1);
				wait();
		} else if ($box.offset().top - $box_top < -50) {
				console.log('Swiped Top!');
				SwipeTop();
				clearInterval(timer1);
				wait();
		}
>>>>>>> master
}

function refreshView() {
	console.log(companyList.length);
	company = companyList[Math.floor(Math.random() * companyList.length)];
	console.log(company);
	companyList = companyList.filter(function(item) { 
		return item !== company
	});
	console.log(companyList.length);
	$.ajax({
			url: `https://api.iextrading.com/1.0/stock/${company}/chart`,
			success: function(res) {
					console.log(res);
					for (var i = 0; i < res.length; i++) {
							var date = res[i].date,
									closePrice = res[i].close;
							labelX.push(date);
							labelY.push(closePrice);
					}
					$.get({
							url: `https://api.iextrading.com/1.0/stock/${company}/quote`,
							success: function(res) {
								$("#companyName").html(res.companyName + ' (' + res.symbol + ')');
								$("#latestPrice").html('$' + res.latestPrice);
								var plusOrMinus = (res.change.toString().slice(0,1) === '-') ? '-' : '+';

								if (plusOrMinus === "+") {
									$("#priceChange").html('($' +res.change.toString());
								} else {
									$("#priceChange").html('('+res.change.toString().slice(0,1) + '$' + res.change.toString().slice(1));	
								}

									var changePercent = (Math.abs((res.changePercent * 100).toFixed(2)) == 0) ?
											res.changePercent * 100 :
											(res.changePercent * 100).toFixed(2);

									$("#priceChange").append(' / ' + changePercent + '%)');
									if (res.change > 0) {
											$("#priceChange").addClass('greenColor');
									} else if (res.change < 0) {
											$("#priceChange").addClass('redColor');
									}
									$("#today").html('Today');
							}
					});

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
											xAxes: [{
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
																	return '$' + value;
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
}

function SwipeLeft() {
		$.get("https://kalusto-py.mybluemix.net/api/symbol", function(res) {
				console.log(res);
		});
		refreshView();
		// document.getElementById("formLeft").submit();

}

function SwipeUp() {
		document.getElementById("transactionForm").submit();
}

function SwipeRight() {
		//	 document.getElementById("formRight").submit();
}

function wait() {
		// Recheck for swipe after waiting for 2 seconds
		window.setTimeout(function() {
				timer1 = setInterval(function() {
						checkForSwipe()
				}, 50);
		}, 2000);
}