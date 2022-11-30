export const getCartItemById = (id, cartItems) => {
  const cartItem = cartItems.find((item) => item.id === id)
  return cartItem
}
export const numberFormatter = new Intl.NumberFormat('vi-VN')
export const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})
