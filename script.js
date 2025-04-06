
const API_key = '1dfee3be611bee6de335fc883d0f0a0a'


document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput = document.querySelector('#city-input')
    const getWeatherButton = document.querySelector('#get-weather-btn')
    const weatherInfo = document.querySelector('#weather-info')
    const cityName = document.querySelector('#city-name')
    const temperature = document.querySelector('#temperature')
    const description = document.querySelector('#description')
    const errorMessage = document.querySelector('#error-message')

    getWeatherButton.addEventListener('click', async ()=>{
        const city = cityInput.value.trim()
        if(!city) {return}




        try {
            const weatherData = await getWeatherData(city)
            showWeatherData(weatherData)
        } catch (error) {
            showError()
        }

    })


    async function getWeatherData(city){//fetches the weather data

        const url = `https://api.weatherstack.com/current?access_key=${API_key}&query=${city}`;
        
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result)
            return result;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    function showWeatherData(data){
        cityName.textContent = data.location.name 
        temperature.textContent = `${data.current.temperature} \u00B0C`;
        description.textContent= data.current.weather_descriptions[0]


        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
        //displays weather data
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }

})