import * as React from 'react'
import { Card, CardContent, CardMedia, IconButton } from '@mui/material'
import testImage from '../../assets/images/products/yellowT.png'
import { currencyFormatter, getMatchItemById } from '../utils/helper'
import { successToast } from '../utils/toastify'
import { cartItemsAtom } from '../states/selectedCardItem'
import { useAtom } from 'jotai'
import LoginModal from '../components/LoginModal'
import { userAtom } from '../states/user.state'
import { loginModalAtom } from '../states/modal.state'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import EditIcon from '@mui/icons-material/Edit'
import { navigate } from 'gatsby'

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
      successToast('🦄Thêm sản phẩm vào giỏ hàng thành công!')
    } else {
      setLoginModal(true)
    }
  }
  const handleSelectedProductDetail = (productId) => {
    navigate(`/product?id=${productId}`)
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
          <div className="text-xl font-bold h-14">{product.title}</div>
          <div className="text-base h-9">
            {currencyFormatter.format(product.price)}
          </div>
        </CardContent>
        <div className="flex flex-row justify-center items-center space-x-2 px-4 pb-2">
          <div className="border-2 border-blue-300 rounded-md flex-1 ">
            <IconButton
              aria-label="add"
              variant="outlined"
              color="primary"
              onClick={() => handleAddToCartBtn(product.id)}
              className="w-full"
            >
              <AddShoppingCartIcon />
            </IconButton>
          </div>
          <div className="border-2 border-blue-300 rounded-md flex-1 ">
            <IconButton
              aria-label="detail"
              variant="outlined"
              color="primary"
              className="w-full m-0"
              onClick={() => handleSelectedProductDetail(product.id)}
            >
              <EditIcon />
            </IconButton>
          </div>
        </div>
      </Card>
      <LoginModal />
    </>
  )
}
