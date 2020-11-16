
$("#container_1").on("click","#button-addon2",search)
    
function search(event){
    event.preventDefault();
    
    // var city = $("#cities").val()
    // localStorage.setItem("Searched-City", cityClicked);
    var cityClicked = $("#cities").val()||$(this).text();
    console.log(cityClicked);

    savedCity.push(cityClicked)
    localStorage.setItem("searched-city",JSON.stringify(savedCity));
    
        
    
    var currentDay = moment().format("MM/DD/YYYY");
    // console.log(currentDay);
    $(".main_date").text(cityClicked + " "+currentDay);
    
    // search(event);
    request(cityClicked);
};
// var storedCitiesJSON = localStorage.getItem("Searched-City");
var savedCity = JSON.parse(localStorage.getItem("Searched-City"))||[];
console.log(savedCity);

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
function secondRequest(latitude,longitude){

    var scndQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=bcd175ceb7463d439ff2fd3b39ac3761"




    $.ajax({
        url: scndQueryURL,
        method: "GET"
    }).then(function(response){
            // console.log(response.value);
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