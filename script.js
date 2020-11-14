
$("#button-addon2").on("click",search)
    
function search(event){
    event.preventDefault();
    
    var city = $("#cities").val()
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=bcd175ceb7463d439ff2fd3b39ac3761&units=imperial"
    var currentDay = moment().format("MM/DD/YYYY");
    console.log(currentDay);
    $(".main_date").text(city + " "+currentDay);
    
    // search(event);
    request(queryURL);
};
    
    //in the .then section i need to add another ajax request for the other API//
function request(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
            console.log(response);
            $(".data1").text("Temperature: " + response.main.temp + "°F");
            $(".data2").text("Humidity: " + response.main.humidity + "%");
            $(".data3").text("Wind Speed: " + response.wind.speed + "mph");
            var latitude = response.coord.lat;
            // console.log(latitude);
            var longitude = response.coord.lon;
            // console.log(longitude)
            secondRequest(latitude,longitude);
        });

    };
function secondRequest(latitude,longitude){

    var scndQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=bcd175ceb7463d439ff2fd3b39ac3761"




    $.ajax({
        url: scndQueryURL,
        method: "GET"
    }).then(function(response){
            console.log(response.value);
            var uvI = response.value;
            $(".data4").text("UV Index: " + uvI);
        });

};