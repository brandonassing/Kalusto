$(document).ready(function() {
	function refreshList(){
		$.get("/api/symbols", function(data){
          	var symbol;
            for(var i in data){
            	symbol = JSON.stringify(data[i].symbol).replace(/['"]+/g, '').toUpperCase();
            	$("#liked-list").append('<li id="' + symbol + '-liked" class="DocumentItem"><h3>' + symbol + '</h3></li>');
            	var url = "https://api.iextrading.com/1.0/stock/" + symbol + "/quote";
            	$.get(url, function(stockData){
            		var name = JSON.stringify(stockData.companyName).replace(/['"]+/g, '');
            		var price = JSON.stringify(stockData.latestPrice).replace(/['"]+/g, '');
            		var volume = JSON.stringify(stockData.latestVolume).replace(/['"]+/g, '');
            		var symbol = JSON.stringify(stockData.symbol).replace(/['"]+/g, '');
					$('#'+ symbol + '-liked').append('<p>' + name + '</p><h4>Latest Price: ' + price + '</h4><h4>Latest Volume: ' + volume + '</h4>');
	            });
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
});