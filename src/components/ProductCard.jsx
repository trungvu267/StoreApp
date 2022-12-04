import * as React from 'react'
import {
  ButtonGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import testImage from '../../assets/images/products/yellowT.png'
import { currencyFormatter, getMatchItemById } from '../utils/helper'
import { successToast } from '../utils/toastify'
import { cartItemsAtom } from '../states/selectedCardItem'
import { useAtom } from 'jotai'
import LoginModal from '../components/LoginModal'
import { userAtom } from '../states/user.state'
import { loginModalAtom } from '../states/modal.state'
export default function ProductCard({ product }) {
  const [, setCartItems] = useAtom(cartItemsAtom)
  const [, setLoginModal] = useAtom(loginModalAtom)
  const [user] = useAtom(userAtom)
  const handleAddToCartBtn = (productId) => {
    if (user) {
      setCartItems((preCartItems) => {
        const matchItem = getMatchItemById(productId, preCartItems)
        if (!matchItem) return [...preCartItems, { productId, quantity: 1 }]
        return preCartItems.map((item) => {
          if (item.productId === productId)
            return { ...item, quantity: item.quantity + 1 }
          return item
        })
      })
      successToast('🦄 Add To Cart Successfully!')
    } else {
      setLoginModal(true)
    }
  }
  return (
    <>
      <Card sx={{ maxWidth: 200 }} className="col-span-1 mx-auto">
        <div className="p-3 bg-blue-200">
          <CardMedia
            component="img"
            height="50"
            width="50%"
            image={product.image || testImage}
            alt="green iguana"
            className="mx-auto"
          />
        </div>
        <CardContent className="pb-0 mb-0">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-base"
          >
            {product.title}
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            className="my-0 py-0"
          >
            {currencyFormatter.format(product.price)}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
            className="space-y-1"
          >
            <Button
              variant="outlined"
              size="small"
              color="success"
              className="w-full"
              onClick={() => handleAddToCartBtn(product.id)}
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="warning"
              className="w-full m-0"
            >
              View Product detail
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
      <LoginModal />
    </>
  )
}
