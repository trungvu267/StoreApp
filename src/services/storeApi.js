import axios from 'axios'
export const instance = axios.create({
  // baseURL: 'https://api.publicapis.org',
  baseURL: 'https://localhost:7280/api',
})
const storeApi = {
  getProducts: async () => {
    // const response = await instance.get('/entries')
    const response = await instance.get('/products')
    const data = await response.data
    console.log(data)
    return data
  },
}

export default storeApi
