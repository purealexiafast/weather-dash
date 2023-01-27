const ApiKey = "16d59cf66d3930a656df911a48b325c6" 



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
            console.log(dataJsonFormat)
            const searchedCity = dataJsonFormat[0].name
            savedSearch(searchedCity)
            const lat = dataJsonFormat[0].lat
            const lon = dataJsonFormat[0].lon
            getWeather(lat, lon, searchedCity);
        });
}
function savedSearch(city) {
    const previousSearches = JSON.parse(localStorage.getItem("searchedcitys")) || []
    if (!previousSearches.includes(city)


    ) {
        previousSearches.push(city)
        localStorage.setItem("searchedcitys", JSON.stringify(previousSearches))
        displayButtons()
    }
}

function getWeather(lat, lon, searchedCity) {
    const weather5Day = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + ApiKey //imperial is setting diff than standard to get farenheight instead of kalvin
    fetch(weather5Day)
        .then(function (weatherData) {  //after data is recieved from open weather THEN run this function
            return weatherData.json() //Must return so that the next .then function can pick it up

        })
        .then(function (dataJsonFormat) {
            // console.log(dataJsonFormat);
            console.log(dataJsonFormat.list);
            let lessDays = dataJsonFormat.list.filter(function (element) {
                if (element.dt_txt.includes("12:00:00"))
                    return true;
                else
                    return false;
            })

            displayWeather(lessDays);

            currentWeather(dataJsonFormat.list[0], searchedCity);
        });
}


function displayWeather(days5) {

    
    const days5Container = document.getElementById("day5-forecast");
    days5Container.innerHTML = ""
    days5Container.classList.add("days")

    for (let index = 0; index < days5.length; index++) {
        const day = days5[index];

        const dEl = document.createElement("div")
        dEl.classList.add("day")
        dEl.textContent = day.dt_txt.replace(" 12:00:00", "");
        days5Container.append(dEl);

        const weatherImages = document.createElement("img")
        weatherImages.setAttribute("src", `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`)
        dEl.appendChild(weatherImages) 

        const temp = document.createElement("h3")
        temp.textContent = "Temperature: " + day.main.temp
        dEl.appendChild(temp);

        const wind = document.createElement("h3")
        wind.textContent ="Wind Speed: " + day.wind.speed
        dEl.appendChild(wind)

        const humid = document.createElement("h3")
        humid.textContent ="Humidity: " + day.main.humidity
        dEl.appendChild(humid)

    
    } 

}


function displayButtons(){
 const savedCities = JSON.parse(localStorage.getItem("searchedcitys")) || [] //if falsy (null, undefined, false, empty strings, NaN) will convert to array 
 const buttonDiv = document.getElementById("buttons");
 buttonDiv.innerHTML = ""
 for (let i = 0; i < savedCities.length; i++) {
    const button = document.createElement("button");
    button.textContent = savedCities[i]
    
    buttonDiv.append(button);
    button.addEventListener("click", function(event){

    event.preventDefault()       
    getLocation(savedCities[i])
    })
    
 }

}

displayButtons();


function currentWeather(days1, searchedCity) {

    const day1Container = document.getElementById("city-weather");
    const day1Weather = document.createElement("div")
    day1Container.innerHTML = "";
    day1Weather.classList.add("day1")
    const date = new Date(days1.dt * 1000)

    const cityNameDay1 = document.createElement("h2")
    cityNameDay1.style.display = "inline-block"
    cityNameDay1.textContent = searchedCity
    day1Container.append(cityNameDay1)

    console.log(days1)

   
    const  image = document.createElement("img")
    image.setAttribute("src", `https://openweathermap.org/img/wn/${days1.weather[0].icon}.png`)
    image.style.display = "inline-block"
    day1Container.append(image)
    image.classList.add("temp-image")
    


    day1Weather.textContent = date.toLocaleDateString();
    day1Container.append(day1Weather);

    const temp = document.createElement("h3")
    temp.textContent = "Temperature: " + days1.main.temp
    day1Container.appendChild(temp)

    const wind = document.createElement("h3")
    wind.textContent = "Wind Speed: " + days1.wind.speed
    day1Container.appendChild(wind)

    const humid = document.createElement("h3")
    humid.textContent ="Humidity: " + days1.main.humidity
    day1Container.appendChild(humid)

    console.log(days1);

}


