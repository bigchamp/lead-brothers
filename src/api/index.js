import axios from 'axios'

const endpoint = 'http://api.openweathermap.org/data/2.5'
const apiKey = 'c5c90f7829909e926b016478520d5e63'

export function weatherAPI(params) {
  const {method, data, url} = params

  return axios({
    method: method || 'GET',
    url: endpoint + url,
    params: {
      appid: apiKey,
      units: 'metric',
      lang: 'ru',
      ...data
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
