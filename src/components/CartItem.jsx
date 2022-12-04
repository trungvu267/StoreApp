import * as React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
  getCartItemById,
  numberFormatter,
  getTotalPrice,
} from '../utils/helper'
import { cartItemsAtom } from '../states/selectedCardItem'
import { productsAtom } from '../states/products.states'
import { useAtom } from 'jotai'
import { errorToast } from '../utils/toastify'
export default function CartItem({ cartItem }) {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom)
  const [products] = useAtom(productsAtom)
  const item = getCartItemById(cartItem.productId, products)

  const handleIncrementBtn = () => {
    setCartItems(
      cartItems.map((item) => {
        if (item.productId === cartItem.productId)
          return { ...item, quantity: item.quantity + 1 }
        return item
      })
    )
  }
  const handleDecrementBtn = () => {
    setCartItems(
      cartItems.map((item) => {
        if (item.productId === cartItem.productId)
          return {
            ...item,
            quantity: item.quantity === 1 ? 1 : item.quantity - 1,
          }
        return item
      })
    )
  }
  const handleRemoveBtn = () => {
    setCartItems(
      cartItems.filter((item) => item.productId !== cartItem.productId)
    )
    errorToast('Xóa sp ra khỏi giỏ hàng thành công ')
  }
  return (
    <Card
      sx={{
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 50,
            height: 50,
          }}
          image={item.image}
          alt="Live from space album cover"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="p" noWrap>
            {item.title}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {numberFormatter.format(item.price)}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton aria-label="decrement" onClick={handleDecrementBtn}>
            <RemoveIcon />
          </IconButton>
          <Box>{cartItem.quantity}</Box>
          <IconButton aria-label="increment" onClick={handleIncrementBtn}>
            <AddIcon />
          </IconButton>
        </CardContent>
        <CardContent>
          {numberFormatter.format(getTotalPrice(item.price, cartItem.quantity))}
        </CardContent>
        <CardContent>
          <IconButton aria-label="delete" onClick={handleRemoveBtn}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Box>
    </Card>
  )
}
