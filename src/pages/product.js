import React, { useEffect, useState } from 'react'
import storeApi from '../services/storeApi'
import Layout from '../components/Layout'
import Loading from '../components/Loading'
import { currencyFormatter, getMatchItemById } from '../utils/helper'
import { Box, Button, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { cartItemsAtom } from '../states/selectedCardItem'
import { useAtom } from 'jotai'
import ToastContainer from '../components/ToastContainer'
import { errorToast, successToast } from '../utils/toastify'
import { userAtom } from '../states/user.state'
const Product = ({ location }) => {
  const [fetching, setFetching] = useState(false)
  const [product, setProduct] = useState(null)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const productId = searchParams.get('id')
    if (!productId) {
      console.log('Cần có thông tin mã sản phẩm')
      return
    }
    async function getProduct() {
      const data = await storeApi.getProduct(productId)
      setProduct(data)
    }
    setFetching(true)
    getProduct()
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setFetching(false)
      })
  }, [])
  return (
    <>
      <Layout />
      {product ? <ProductDetail product={product} /> : <Loading />}
      <ToastContainer />
    </>
  )
}

export default Product

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [, setCartItems] = useAtom(cartItemsAtom)
  const [user] = useAtom(userAtom)

  const handleIncrementBtn = () => {
    setQuantity((preState) => preState + 1)
  }
  const handleDecrementBtn = () => {
    setQuantity((preState) => (preState === 1 ? 1 : preState - 1))
  }
  const handleAddToCartBtn = () => {
    if (!user) {
      errorToast('Vui lòng đăng nhập để thực hiện chức năng này')
      return
    }
    setCartItems((preCartItems) => {
      const matchItem = getMatchItemById(product.id, preCartItems)
      if (!matchItem)
        return [...preCartItems, { productId: product.id, quantity: 1 }]
      return preCartItems.map((item) => {
        if (item.productId === product.id)
          return { ...item, quantity: item.quantity + quantity }
        return item
      })
    })
    successToast('🦄Thêm sản phẩm vào giỏ hàng thành công!')
  }
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2 mt-11 border-2 border-blue-300 rounded-md">
      <div className="bg-blue-300 flex justify-center items-center">
        <img
          src={product.image}
          width={'80%'}
          height={'80%'}
          className="rounded-md"
        />
      </div>
      <div className=" space-y-4 pt-11 pl-5">
        <div className="font-bold text-xl text-blue-400 first-letter:uppercase">
          {product.category}
        </div>
        <div className="font-bold text-3xl ">{product.title}</div>
        <div className="text-lg text-gray-600">{product.description}</div>
        <div>{product.rating.rate}</div>
        <div className="text-lg font-bold">
          {currencyFormatter.format(product.price)}
        </div>
        <div className="flex flex-row justify-start items-center space-x-5">
          <div className="flex flex-row justify-center items-center space-x-5 rounded-md bg-gray-300">
            <IconButton
              aria-label="decrement"
              onClick={handleDecrementBtn}
              color="primary"
            >
              <RemoveIcon />
            </IconButton>
            <Box>{quantity}</Box>
            <IconButton
              aria-label="increment"
              onClick={handleIncrementBtn}
              color="primary"
            >
              <AddIcon />
            </IconButton>
          </div>
          <div>
            <Button
              variant="outlined"
              startIcon={<ShoppingCartOutlinedIcon />}
              color="primary"
              onClick={handleAddToCartBtn}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
