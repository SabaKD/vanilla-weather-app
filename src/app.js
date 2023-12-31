function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours< 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes< 10){
        minutes = `0${minutes}`;
    }
    
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesay", "Thursday", "Friday", "Saturday"];
    return `Last updated: ${days[day]} ${hours}:${minutes}`

}
function formatDay(timestamp){
    let date = new Date(timestamp);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${days[day]}`

}
function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");
    let forecastHtml = `<div class="row">`;
    forecast.forEach(function (forecastDay, index){
        if (index < 6){
    forecastHtml = forecastHtml + `
                        <div class="col-2">
                            <div class="weather-forecast-date">${formatDay(forecastDay.time * 1000)}</div>
                            <img src="${forecastDay.condition.icon_url}" alt="" width="42">
                            <div class="weather-forecast-temperature">
                                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
                            </div>
                        </div>
                    `;}})
    forecastHtml = forecastHtml + `</div>`
    
    forecastElement.innerHTML = forecastHtml;
}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    celciusTemperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `Humidity : ${response.data.temperature.humidity}%`;
    windElement.innerHTML = `Wind : ${Math.round(response.data.wind.speed)} km/h`;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute("src",response.data.condition.icon_url);


}
function search(city){
    let apiKey = "4bc76te01aac743d12o764377f46072e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
    axios.get(apiForecastUrl).then(displayForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);



search("Lisbon");
