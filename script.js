
$("#button-addon2").on("click",search)
    
function search(event){
    event.preventDefault();
    
    var city = $("#cities").val()
    
    var currentDay = moment().format("MM/DD/YYYY");
    console.log(currentDay);
    $(".main_date").text(city + " "+currentDay);
    
    // search(event);
    request(city);
};

//in the .then section i need to add another ajax request for the other API//
function request(cityName) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=bcd175ceb7463d439ff2fd3b39ac3761&units=imperial"
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
        thirdRequest(cityName);
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
            if (uvI <= 3){
                $(".data4").addClass("bg-success text-white p-1 rounded");
            }else if (uvI > 3 && uvI <= 7){
                $(".data4").addClass("bg-warning text-white p-1 rounded");
            }else if (uvI > 7){
                $(".data4").addClass("bg-danger text-white p-1 rounded");
            }
               
            
        });

};

function thirdRequest(city){
    var trdQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=bcd175ceb7463d439ff2fd3b39ac3761&units=imperial";

    $.ajax({
        url: trdQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
}