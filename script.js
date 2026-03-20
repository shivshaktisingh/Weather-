const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const body = document.body;

async function checkWeather(city){

    const api_key = "b7ebd79bde4f7e0a091828691fed8fee"; 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${api_key}&units=metric`;

    try{
        const response = await fetch(url);
        const weather_data = await response.json();

        console.log(weather_data);

        if(weather_data.cod === "404"){
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            body.style.backgroundImage = "url('image/404.png')";
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        
        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;


        const desc = weather_data.weather[0].description;
        description.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);

        
        humidity.innerHTML = `${weather_data.main.humidity}%`;

        
        wind_speed.innerHTML = `${(weather_data.wind.speed * 3.6).toFixed(1)} Km/H`;

        const weatherMain = weather_data.weather[0].main;
        const weatherDesc = weather_data.weather[0].description.toLowerCase();

        
        if(weatherMain === "Clouds" && weatherDesc.includes("overcast")){
            weather_img.src = "image/overcastcloud.jpg"; // ✔ correct filename
            body.style.backgroundImage = "url('image/overcastcloud.jpg')";
        }
        else if(weatherMain === "Clouds" && weatherDesc.includes("scattered")){
            weather_img.src = "image/scattered.png";
            body.style.backgroundImage = "url('image/scattered.png')";
        }
        else if(weatherMain === "Clouds" && weatherDesc.includes("broken")){
            weather_img.src = "image/broken.png";
            body.style.backgroundImage = "url('image/broken.png')";
        }
        else{
            switch(weatherMain){

                case 'Clouds':
                    weather_img.src = "image/cloud.png";
                    body.style.backgroundImage = "url('image/cloud.png')";
                    break;

                case 'Clear':
                    weather_img.src = "image/clear.png";
                    body.style.backgroundImage = "url('image/clear.png')";
                    break;

                case 'Rain':
                case 'Drizzle':
                    weather_img.src = "image/rain.png";
                    body.style.backgroundImage = "url('image/rain.png')";
                    break;

                case 'Mist':
                case 'Haze':
                    weather_img.src = "image/haze.png";
                    body.style.backgroundImage = "url('image/haze.png')";
                    break;
                case 'Fog':
                case 'Smoke':
                    weather_img.src = "image/mist.png";
                    body.style.backgroundImage = "url('image/mist.png')";
                    break;

                case 'Thunderstorm':
                    weather_img.src = "image/thunderstorm.png";
                    body.style.backgroundImage = "url('image/thunderstorm.png')";
                    break;

                case 'Snow':
                    weather_img.src = "image/snow.png";
                    body.style.backgroundImage = "url('image/snow.png')";
                    break;

                default:
                    weather_img.src = "image/cute.png";
                    body.style.backgroundImage = "url('image/cute.png')";
            }
        }

        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundRepeat = "no-repeat";

    } catch(error){
        console.log("Error:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        body.style.backgroundImage = "url('image/404.png')";
    }
}

searchBtn.addEventListener('click', ()=>{
    if(inputBox.value.trim() !== ""){
        checkWeather(inputBox.value);
    }
});
inputBox.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        if(inputBox.value.trim() !== ""){
            checkWeather(inputBox.value);
        }
    }
});