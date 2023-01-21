const ApiKey = "180c9f853ac8fcc595fe4080e0abf997" //replace with my API key later



document.getElementById("search-button").addEventListener("click", function (event) {
    event.preventDefault();
    const searchedCity = document.getElementById("input").value
    getLocation(searchedCity);
});

function getLocation(cityName) {
    const locationGeo = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + ApiKey
    fetch(locationGeo)
        .then(function (locationData) {  //after data is recieved from open weather THEN run this function
            return locationData.json() //Must return so that the next .then function can pick it up

        })
        .then(function (dataJsonFormat) {
            console.log(dataJsonFormat);
            const lat = dataJsonFormat[0].lat
            const lon = dataJsonFormat[0].lon
            getWeather(lat, lon);
        });
}

function getWeather(lat, lon) {
    const weather5Day = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + ApiKey //imperial is setting diff than standard to get farenheight instead of kalvin
    fetch(weather5Day)
        .then(function (weatherData) {  //after data is recieved from open weather THEN run this function
            return weatherData.json() //Must return so that the next .then function can pick it up

        })
        .then(function (dataJsonFormat) {
            console.log(dataJsonFormat);
           displayWeather();
        });
}

function displayWeather(){
     
    
    //dont forget to call function
}