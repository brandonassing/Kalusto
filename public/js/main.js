$(document).ready(function() {
	$("#placeholder-box").draggable({
		revert: false,
	});

	$("#refresh").click(function(){

          $.get("/api/symbols", function(data){
            //window.alert(JSON.stringify(data));
            for(var i in data){
            	var symbol = JSON.stringify(data[i].symbol).replace(/['"]+/g, '').toUpperCase();
            	$("#liked-list").append('<li class="DocumentItem"><h3>' + symbol + '</h3></li>');
            }
            //$.each(data, function (i, item) {
            	
            	//$("#liked-list ul").append('<li class="DocumentItem"><h3>'+ item.symbol +'</h3></li>');
            //}
        });

	});
})