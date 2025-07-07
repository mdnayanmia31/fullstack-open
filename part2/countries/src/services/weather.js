import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5'

const getWeather = (city) => {
  const request = axios.get(`${baseUrl}/weather?q=${city}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)
}

export default { getWeather }