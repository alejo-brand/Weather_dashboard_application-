    /*  */

$(document).ready(function(){

var cityListEL = $("#recent-searches")

// create a variable to get the cities saved into local storage and setup an empty arrat
var savedCity = JSON.parse(localStorage.getItem("searched-city"))||[];
console.log(savedCity);
// render the cities from that "empty array"
for (var cityPointer =0; cityPointer<savedCity.length;cityPointer++){
    var cityTitle = $('<button>').addClass('list-group-item citybtn').text(savedCity[cityPointer]);
    cityListEL.prepend(cityTitle);
} 
//this function calls accepts the click of the user and gets the value of the citie searched
function search(event){
    event.preventDefault();
    
    // var city = $("#cities").val()
    // localStorage.setItem("Searched-City", cityClicked);
    var cityClicked = $("#cities").val()||$(this).text();

    // console.log(cityClicked);
    //this sends the city from the local storage into the setup empty array named savedCity
    savedCity.push(cityClicked)
    localStorage.setItem("searched-city",JSON.stringify(savedCity));
    
    
    
    // search(event);
    request(cityClicked);
};

//this function accepts the city entered and renders the information in the main jumbotron
function request(cityName) {
    var currentDay = moment().format("MM/DD/YYYY");
    // console.log(currentDay);
    $(".main_date").text(cityName + " "+currentDay);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=bcd175ceb7463d439ff2fd3b39ac3761&units=imperial"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response);
        $(".data1").text("Temperature: " + response.main.temp + "°F");
        $(".data2").text("Humidity: " + response.main.humidity + "%");
        $(".data3").text("Wind Speed: " + response.wind.speed + "mph");
        var iconMain = response.weather[0].icon;
        $("#icon_main").attr("src","http://openweathermap.org/img/w/" + iconMain + ".png")
        var latitude = response.coord.lat;
        // console.log(latitude);
        var longitude = response.coord.lon;
        // console.log(longitude)
        secondRequest(latitude,longitude);
        thirdRequest(cityName);
    });

    };
    //this function accepts the latitude and longitude needed to calculate de uv index and determines classifies the uv index
function secondRequest(latitude,longitude){

    var scndQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=bcd175ceb7463d439ff2fd3b39ac3761"




    $.ajax({
        url: scndQueryURL,
        method: "GET"
    }).then(function(response){
            // console.log(response.value);
            var uvI = response.value;
            console.log(uvI);
    
            $(".data4").text("UV Index: " + uvI);
            if (uvI <= 3){
                $(".data4").addClass("bg-success text-white p-1 rounded")
                $(".data4").removeClass("bg-danger bg-warning")
            }else if (uvI > 3 && uvI <= 7){
                $(".data4").addClass("bg-warning text-white p-1 rounded")
                $(".data4").removeClass("bg-warning bg-danger")
            }else if (uvI > 7){
                $(".data4").addClass("bg-danger text-white p-1 rounded")
                $(".data4").removeClass("bg-success bg-warning")
            }
               
            
        });

};
// this function calls makes the request for the 5 day forecast and renders the five cards
function thirdRequest(city){
    var trdQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=bcd175ceb7463d439ff2fd3b39ac3761&units=imperial";

    $.ajax({
        url: trdQueryURL,
        method: "GET"
    }).then(function(response){
        // console.log(response.list)
        
        for (var i = 1; i<6;i++){
            $(".date"+ i).text(moment().add(i,"days").startOf("day").format("MM/DD/YYYY"));
            var icon = response.list[i + 8].weather[0].icon;
            $("#icon" + i).attr("src","http://openweathermap.org/img/w/" + icon + ".png")
            $(".temp"+i).text("Temperature: " + response.list[i+8].main.temp + "°F");
            $(".hum"+ i).text("Humidity: " + response.list[i+8].main.humidity + "%");
            
            
        }
    });
}
$("#button-addon2").on("click",search)
// this anonnymous function listen to the click of any searched city in the list group and calls the request function to render the page again
$(".citybtn").on("click",function(event){
    event.preventDefault();
    console.log(event.target)
   var CityBtnName = (event.target).innerText;
    console.log(CityBtnName);
    request(CityBtnName);
    });

});