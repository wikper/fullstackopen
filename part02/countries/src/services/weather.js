import axios from 'axios'

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'

const getWeather = (capital) => {
  const params = {
    q: capital,
    appid: process.env.REACT_APP_WEATHER_API_KEY,
    units: 'metric',
  }
  const request = axios.get(baseUrl, { params })
  return request.then((response) => response.data)
}

export default { getWeather }
