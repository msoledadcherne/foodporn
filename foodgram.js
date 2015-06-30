var client_id = "8d561d666c3a44eebf6130fa11d7aee0";
var tagName = "foodporn";
var hashtag_url = "https://api.instagram.com/v1/tags/foodporn/media/recent?client_id=8d561d666c3a44eebf6130fa11d7aee0";
// var location_url = "https://api.instagram.com/v1/locations/search?foursquare_v2_id="+dataCity+"&client_id=8d561d666c3a44eebf6130fa11d7aee0" ;
// var location_url_final = "https://api.instagram.com/v1/locations/" +locationId+ "/media/recent?"
var counter = 0;

// Foodpon button 

var addthis_config = {
              pubid: "ra-5590acb441de2291"
        }


$(document).ready(function(){
	$("#foodporn").click(function(){
		console.log("foodporn button clicked!")
		$('#photos').html("");
		counter = 0;
		$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/tags/foodporn/media/recent?client_id=8d561d666c3a44eebf6130fa11d7aee0",
		success: filterPhotos
		});
	});

// Restaurant buttons 

	$(".buttonloc").click(function(){
		$('#photos').html("");
		counter = 0;
		var dataCity = $(this).data("city");
		$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/locations/search?foursquare_v2_id="+dataCity+"&client_id=8d561d666c3a44eebf6130fa11d7aee0",
		success: getDataLoc
		});
	});

	$("#foodporn").click();

});

// Function to paste the pictures #foodporn from json to the html

// function printData(data){
// 	console.log(data);
// 	counter = counter+1;
// 	var len = data.data.length;
// 	console.log(len);
// 	for (var i=0; i < len; i++){
// 	$("#photos").append("<a target='_blank' href='" + data.data[i].link +"'><img src='" + data.data[i].images.low_resolution.url +"'></img></a>");
// 	};
// }

// Part 2: Get forsquare location 

function getDataLoc(data){
	console.log(data);
	var locationId = data.data[0].id;
	console.log(data);
	var url1 = "https://api.instagram.com/v1/locations/"+locationId+"/media/recent?&client_id="+client_id;
	console.log(url1);
	$.ajax({
		type:"GET",
		dataType:"jsonp",
		cache: false,
		url: url1,
		success: filterPhotos
	});
};


function filterPhotos(pics){
	// console.log(pics);
	var next_url = pics.pagination.next_url;
	$.each(pics.data, function( index, data ) {
  	var tags = pics.data[index].tags; 
  	// console.log("next_url:" + next_url);
  	// console.log(tags);
  	if (tags.indexOf("foodporn") > -1){		
		// photo = "<a href='" +data.link+ "'target=_blank'><img src='" +data.images.low_resolution.url + "'></a>";
		photo = "<a href=' " +data.link+ "' class='thumbnail' 'target=_blank'> <img src='" +data.images.low_resolution.url + "'></a>";
		if (counter < 12){
			$('#photos').append(photo);	
			counter = counter+1;
			console.log("counter is now: " + counter);
		}
	}
	});

	if (counter<12) {
		getMoreData(next_url);

	} 
	else {
		return
	}

};
7
function getMoreData(next_url){
	//ajax para conseguir fotos, y luego pasar la data a filter photos
	$.ajax({
		type: "GET",
		dataType:'jsonp',
		cache: false,
		url: next_url,
		success: filterPhotos
	});
};



