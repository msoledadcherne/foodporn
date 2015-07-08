var client_id = "8d561d666c3a44eebf6130fa11d7aee0";
var tagName = "foodporn";
var hashtag_url = "https://api.instagram.com/v1/tags/foodporn/media/recent?client_id=8d561d666c3a44eebf6130fa11d7aee0";
var counter = 0;
var next_url =  "";
var max_photos = 20;
var negative_tags = [
"bodybuilding",
"body",
"muscle",
"crossfit",
"selfie",
"likeforfollow",
"sfs", 
"follow4follow", 
"like4like", 
"doubletap",
"followforfollow",
"brides",
"weddings",
"abs",
"skin",
"massage",
"fashion",
"shoes",
"comedy",
"humor",
"instafamous",
"pool",
"poolvibes",
"gym",
"portrait",
"hot",
"tagsforlikes",
"girlswholift",

]

// Code for social buttons 
var addthis_config = {
    pubid: "ra-5590acb441de2291"
        };

// Foodpon button 
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

// $("#more").click(function(){
// $('#photos').html("");
// 		counter = 0;
// 		$.ajax({
// 		type: "GET",
// 		dataType:'jsonp',
// 		cache: false,
// 		url: next_url,
// 		success: filterPhotos
// 	});
// });

// Scroll functionality

$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
           counter = 0;
           getMoreData(next_url)
    };
});


	//Tests -- DELETE
	/*
	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       		console.log("near bottom!");
       		counter = 0;
       		getMoreData(next_url)

   		}
	});
	*/

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

// Check negative keywords
function checkNegativeTags(tags){
	for (var i=0;i<tags.length;i++){
		if (negative_tags.indexOf(tags[i]) > -1) {
			return true
		}
	}
	return false
}


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

// Part 2: Filter and paste pictures
function filterPhotos(pics){
	// console.log(pics);
	next_url = pics.pagination.next_url;
	$.each(pics.data, function( index, data ) {
  	var tags = pics.data[index].tags; 
  	// console.log("next_url:" + next_url);
  	// console.log(tags);
  	var hasNegativeTag = checkNegativeTags(tags);

  	if (tags.indexOf("foodporn") > -1 && hasNegativeTag == false){		
		// photo = "<a href='" +data.link+ "'target=_blank'><img src='" +data.images.low_resolution.url + "'></a>";
		photo = "<a href=' " +data.link+ "' target='_blank' class='thumbnail'> <img src='" +data.images.low_resolution.url + "'></a>";
		if (counter < max_photos){
			$('#photos').append(photo);	
			counter = counter+1;
			console.log("counter = " + counter);
		}
	}
	});

	if (counter<max_photos) {
		getMoreData(next_url);

	} 
	else {
		return
	}

};

// Part 3: Get more data
function getMoreData(next_url){
	$.ajax({
		type: "GET",
		dataType:'jsonp',
		cache: false,
		url: next_url,
		success: filterPhotos
	});
};


// Part 3: Menu function
$(document).ready(function(){
	$("#affix-ul").affix({
        offset: { 
            top: 290
        }
    });
});

