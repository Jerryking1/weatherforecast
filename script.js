const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "fe102a9914bb53df0f6f8efdc5a3d92f";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city!");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();

    console.log(response);
}


function displayWeatherInfo(data){
    const {name: city , main: {temp, humidity}, weather: [{description, id}]} = data;

    card.textContent = ""
    card.style.diplay = "flex";

    const cityDisplay =document.createElement("h1");
    const tempDisplay =document.createElement("h3");
    const humidityDisplay =document.createElement("p");
    const descDisplay =document.createElement("p");
    const WeatherEmoji =document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}K`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    WeatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
            
        case (weatherId >= 300 && weatherId < 400):
            return "⛈";
            
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
            
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
            
            case (weatherId === 800):
            return "☀";
            
            case (weatherId >= 801 && weatherId < 810):
            return "🌨";

        default:
            return "?"
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.diplay = "flex";
    card.appendChild(errorDisplay)
}