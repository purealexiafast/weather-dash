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
           // console.log(dataJsonFormat);
            console.log(dataJsonFormat.list);
            let lessDays = dataJsonFormat.list.filter(function(element){
                if(element.dt_txt.includes("12:00:00"))
                return true;
                else 
                return false;
            })
            console.log(lessDays);
            
           displayWeather(lessDays);
        });
}


/*var day5 = document.getElementById("buttons")
var anotherP = document.createElement("p");
anotherP.textContent= "hello world";
day5.appendChild(anotherP);
anotherP.style.color="red";*/

function displayWeather(days5){
console.log(days5)

     const days5Container = document.getElementById("day5-forecast");
    days5Container.classList.add("days")
     for (let index = 0; index < days5.length; index++) {
        const day = days5[index];
       const dEl = document.createElement("div")
       dEl.classList.add("day")
       dEl.textContent = day.dt_txt.replace(" 12:00:00", "");
       days5Container.append(dEl);
     }
    
}
