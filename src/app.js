function displayTemprature(response){
    console.log(response.data);
    let tempratureElement = document.querySelector("#temprature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    tempratureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `Humidity : ${response.data.temperature.humidity}%`;
    windElement.innerHTML = `Wind : ${Math.round(response.data.wind.speed)} km/h`;

}


let apiKey = "4bc76te01aac743d12o764377f46072e";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemprature);