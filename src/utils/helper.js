export const getCartItemById = (id, products) => {
  const cartItem = products.find((item) => item.id === id)
  return cartItem
}
export const numberFormatter = new Intl.NumberFormat('vi-VN')
export const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})
export const getMatchItemById = (matchId, items) => {
  return items.find((item) => item.productId === matchId)
}
export const getTotalPrice = (price, quantity) => {
  return price * quantity
}
