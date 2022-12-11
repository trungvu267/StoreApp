import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://localhost:7280/api',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})
const storeApi = {
  getProducts: async () => {
    const response = await instance.get('/products')
    const data = await response.data
    return data
  },
  getProduct: async (productId) => {
    const response = await instance.get(`/products/${productId}`)
    const data = await response.data
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
  setOnlineOrder: async ({ userId, products, addressId }) => {
    return await instance.post('/onlineOrders', {
      userId,
      products,
      addressId,
    })
  },
  createAddress: async ({ userId, street, cellphone }) => {
    return await instance.post('/addresses', {
      userId,
      street,
      cellphone,
    })
  },
  getAddressesByUserId: async (userId) => {
    return await instance.get(`/addresses/users/${userId}`)
  },
  getAddress: async (addressId) => {
    return await instance.get(`/addresses/${addressId}`)
  },
  setAddress: async ({ id, userId, street, cellphone }) => {
    return await instance.put(`/addresses/${id}`, {
      userId,
      street,
      cellphone,
    })
  },
  removeAddress: async (addressId) => {
    return await instance.delete(`/addresses/${addressId}`)
  },
  getOnlineOrder: async (userId) => {
    return await instance.get(`/onlineOrders/users/${userId}`)
  },
}

export default storeApi
