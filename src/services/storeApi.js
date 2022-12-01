import axios from 'axios'
import { navigate } from 'gatsby'
import { errorToast } from '../utils/toastify'

export const instance = axios.create({
  // baseURL: 'https://api.publicapis.org',
  baseURL: 'https://localhost:7280/api',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})
const storeApi = {
  getProducts: async () => {
    // const response = await instance.get('/entries')
    const response = await instance.get('/products')
    const data = await response.data
    console.log(data)
    return data
  },
  getUsers: async () => {
    const data = await instance.get('/users/')
    console.log(data)
  },
  getUser: async (userId) => {
    const data = await instance.get(`/users/${userId}`)
    return data
  },
  register: async ({ username, password }) => {
    instance
      .post('/users/register', {
        username,
        password,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error)
      })
  },
  login: async ({ username, password }) => {
    return await instance.post('/users/login', {
      username,
      password,
    })
  },
}

export default storeApi
