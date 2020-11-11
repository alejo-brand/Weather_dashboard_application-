
$("#button-addon2").on("click",search)
    
function search(event){
    event.preventDefault();
    
    var city = $("#cities").val()
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=bcd175ceb7463d439ff2fd3b39ac3761"
    
    // search(event);
    request(queryURL);
};
    
    
function request(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
            console.log(response);
        });

    
    };
