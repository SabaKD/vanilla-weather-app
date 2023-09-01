function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours< 10){
        hours = `0 ${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes< 10){
        minutes = `0 ${minutes}`;
    }
    
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesay", "Thursday", "Friday", "Saturday"];
    return `Last updated: ${days[day]} ${hours}:${minutes}`

}


function displayTemprature(response){
    let tempratureElement = document.querySelector("#temprature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    tempratureElement.innerHTML = Math.round(response.data.temperature.current);
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

    axios.get(apiUrl).then(displayTemprature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

search("New York")

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);