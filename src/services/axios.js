import axios from 'axios'
// https://api.publicapis.org/entries
// const instance = axios.create({
//   baseURL: 'https://api.publicapis.org/',
//   timeout: 1000,
//   // headers: { 'X-Custom-Header': 'foobar' },
// })
const apiConfig = {
  baseUrl: 'https://api.publicapis.org/',
}

const axiosClient = axios.create({
  baseURL: 'https://api.publicapis.org/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  // paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})
})

axiosClient.interceptors.request.use(async (config) => config)

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
