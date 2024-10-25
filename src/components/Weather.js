import React, { useState } from 'react';
import { API_KEY } from '../utils/constant';

const Weather = () => {
    const [cityName, setCityName] = useState("");
    const [cityWeather, setCityWeather] = useState("");

    const HandleCityName = (e) => {
        setCityName(e.target.value);
    }

    const fetchData = async () => {
        try {
            if (!cityName) {
                alert('Please enter a city name');
                return;
            }
            
            console.log('Fetching weather for:', cityName);
            // console.log('API Key:', API_KEY); // Log the API Key for debugging

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const data = await response.json();
            console.log(data);
            setCityWeather(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleClick = () => {
        fetchData();
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='p-6 bg-cyan-300 w-2/4 h-[600px] mt-10 rounded-xl'>
                <div className='flex flex-col space-y-4 items-center justify-center mt-6'>
                    <input 
                        className='bg-slate-400 text-white text-lg rounded-xl text-center w-96 h-10'
                        type="text" 
                        placeholder='Name of the city' 
                        value={cityName}
                        onChange={HandleCityName}
                    />
                    <button
                        onClick={handleClick}
                        className='p-2 bg-red-500 w-24 rounded-lg text-white hover:text-2xl text-lg cursor-pointer hover:bg-red-800 transition-all duration-500 hover:shadow-md'
                    >
                        Get Weather
                    </button>
                    <h1 className='p-2 m-2 text-white text-lg '>
                        {cityWeather ? `Weather in ${cityWeather.name}` : "Enter a city to get weather"}
                    </h1>
                    <p className='p-2 m-2 text-white text-lg '>
                        temp in {cityName} is : {cityWeather?.main?.temp}
                    </p>
                    <p className='p-2 m-2 text-white text-lg '>
                        temp_max in {cityName} is : {cityWeather?.main?.temp_max}
                    </p>
                    <p className='p-2 m-2 text-white text-lg '>
                        temp_min in {cityName} is : {cityWeather?.main?.temp_min}
                    </p>
                    <p className='p-2 m-2 text-white text-lg '>
                        {cityWeather && cityWeather.weather && cityWeather.weather.length > 0 
                            ? cityWeather.weather[0].description 
                            : 'No weather data available'}
                    </p>
                    <p className='p-2 m-2 text-white text-lg '>
                        Humidity : {cityWeather?.main?.humidity}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Weather;
