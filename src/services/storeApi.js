import axios from 'axios'
import { successToast } from '../utils/toastify'
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
  register: async ({ username, password }) => {
    instance
      .post('/users/register', {
        username,
        password,
      })
      .then(function (response) {
        console.log(response)
        successToast('Đăng ký tài khoản thành công')
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getUsers: async () => {
    const data = await instance.get('/users/')
    console.log(data)
  },
}

export default storeApi
