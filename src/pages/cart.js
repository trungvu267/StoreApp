import React from 'react'
import Layout from '../components/Layout'
import { Container, Box, Typography, Button, Grid } from '@mui/material'
import { cartItemsAtom } from '../states/selectedCardItem'
import { useAtom } from 'jotai'
import CartItem from '../components/CartItem'
import ToastContainer from '../components/ToastContainer'
import { navigate } from 'gatsby'
import storeApi from '../services/storeApi'
import { userAtom } from '../states/user.state'
import { successToast, errorToast } from '../utils/toastify'
import { selectedAddressAtom } from '../states/address.state'
import { addressModalAtom } from '../states/modal.state'
import AddressModal from '../components/AddressModal'
import AddIcon from '@mui/icons-material/Add'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import { AddressCard } from '../components/Address'
import { RESET } from 'jotai/utils'
export default function Cart() {
  const [cartItems] = useAtom(cartItemsAtom)

  return (
    <div>
      <Layout />
      {/* <Container maxWidth="md">
        {cartItems.length !== 0 ? <CartItems /> : <CartWithoutItem />}
      </Container> */}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {cartItems.length !== 0 ? <CartItems /> : <CartWithoutItem />}
          </Grid>
          <Grid item xs={4}>
            <SelectedAddress />
          </Grid>
          <Grid xs={12}>
            <CheckOutBtn />
          </Grid>
        </Grid>
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
      ></Box>
    </>
  )
}

const CartWithoutItem = () => {
  return (
    <Box
      sx={{
        border: '1px solid #808080',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      className="space-y-3"
    >
      <Typography component="div" variant="h4">
        Kh??ng c?? s???n ph???m trong gi??? h??ng
      </Typography>
      <Button
        onClick={() => {
          navigate('../')
        }}
      >
        Quay l???i trang mua s???m
      </Button>
    </Box>
  )
}

const SelectedAddress = () => {
  const [selectedAddress] = useAtom(selectedAddressAtom)
  const [, setOpen] = useAtom(addressModalAtom)
  const handleClick = () => {
    setOpen(true)
  }
  console.log(selectedAddress)
  return (
    <>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={handleClick}
        startIcon={<AddIcon />}
      >
        Th??m ?????a ch??? nh???n h??ng
      </Button>
      <AddressModal />
      <AddressCard address={selectedAddress} hidden={true} />
    </>
  )
}
const CheckOutBtn = () => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom)
  const [user] = useAtom(userAtom)
  const [selectedAddress] = useAtom(selectedAddressAtom)
  const handleClick = async () => {
    if (!selectedAddress) return errorToast('Ch??a c?? ?????a ch??? nh???n h??ng!')
    try {
      await storeApi.setOnlineOrder({
        userId: user.id,
        products: cartItems,
        addressId: selectedAddress.id,
      })
      successToast('?????t ????n h??ng th??nh c??ng!')
      navigate('/online-order')
    } catch (error) {
      console.log(error)
      errorToast('?????t ????n h??ng th???t b???i!')
    }
    setCartItems(RESET)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Button
        variant="outlined"
        color="success"
        sx={{ mb: 2 }}
        startIcon={<ShoppingCart />}
        onClick={handleClick}
      >
        X??c nh???n ????n h??ng
      </Button>
    </Box>
  )
}
