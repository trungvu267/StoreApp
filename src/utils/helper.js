export const getCartItemById = (id, cartItems) => {
  const cartItem = cartItems.find((item) => item.id === id)
  return cartItem
}
