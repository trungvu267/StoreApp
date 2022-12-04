import React from 'react'
import Layout from '../components/Layout'
import { Container, Box, Typography, Button } from '@mui/material'
import { cartItemsAtom } from '../states/selectedCardItem'
import { useAtom } from 'jotai'
import CartItem from '../components/CartItem'
import ToastContainer from '../components/ToastContainer'
export default function Cart() {
  const [cartItems] = useAtom(cartItemsAtom)
  console.log(cartItems)
  return (
    <div>
      <Layout />
      <Container maxWidth="md">
        {cartItems.length !== 0 ? <CartItems /> : <CartWithoutItem />}
      </Container>
      <ToastContainer />
    </div>
  )
}

export const Head = () => <title>Cart</title>

const CartItems = () => {
  const [cartItems] = useAtom(cartItemsAtom)

  const cartItemsEle = cartItems.map((cartItem) => {
    return <CartItem cartItem={cartItem} />
  })
  return (
    <>
      <Box
        sx={{
          border: '1px solid #808080',
          borderRadius: '5px',
          height: '70vh',
          marginTop: '3rem',
          padding: '1rem',
        }}
        className="space-y-3"
      >
        {cartItemsEle}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ backgroundColor: '#00e676' }}
        >
          Xác nhận
        </Button>
      </Box>
    </>
  )
}

const CartWithoutItem = () => {
  return (
    <Box
      sx={{
        marginTop: '3rem',
        border: '1px solid #808080',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="space-y-3"
    >
      <Typography component="div" variant="h4">
        Không có sản phẩm trong giỏ hàng
      </Typography>
    </Box>
  )
}
