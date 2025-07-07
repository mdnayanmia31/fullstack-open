import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (city) {
      weatherService
        .getWeather(city)
        .then(weatherData => {
          setWeather(weatherData)
        })
        .catch(error => {
          console.log('Error fetching weather:', error)
        })
    }
  }, [city])

  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>temperature {weather.main.temp} Celsius</div>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather