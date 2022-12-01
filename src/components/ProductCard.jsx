import * as React from 'react'
import {
  ButtonGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import testImage from '../../assets/images/products/yellowT.png'
import { currencyFormatter } from '../utils/helper'
import { successToast } from '../utils/toastify'
import {
  selectedCartItemIdAtom,
  cartItemsAtom,
} from '../states/selectedCardItem'
import { useAtom } from 'jotai'
export default function ProductCard({ product }) {
  const handleAddToCartBtn = () => {
    successToast('🦄 Add To Cart Successfully!')
  }
  const [selectedCardItem, setSelectedCartItemId] = useAtom(
    selectedCartItemIdAtom
  )
  const [cartItems, setCartItems] = useAtom(cartItemsAtom)
  return (
    <Card sx={{ maxWidth: 200 }} className="col-span-1 mx-auto">
      <div className="p-3 bg-blue-200">
        <CardMedia
          component="img"
          height="50"
          image={testImage}
          alt="green iguana"
          className="mx-auto"
        />
      </div>
      <CardContent className="pb-0 mb-0">
        <Typography gutterBottom variant="h5" component="div">
          {product.productName}
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
            onClick={handleAddToCartBtn}
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
  )
}
