import { useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  weatherService.getWeather(capital).then((weather) => setWeather(weather))

  if (weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>temperature {weather['main']['temp']} Celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png`}
          alt={weather.weather[0]['description']}
        />
        <p>wind {weather['wind']['speed']} m/s</p>
      </div>
    )
  }
}

export default Weather
