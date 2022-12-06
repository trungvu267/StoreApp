import { Container, Box, Typography, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../states/user.state'
import { onlineOrdersAtom } from '../states/onlineOrder.state'
import storeApi from '../services/storeApi'
import { useState } from 'react'
const OnlineOrder = () => {
  const [user] = useAtom(userAtom)
  const [onlineOrders, setOnlineOrders] = useAtom(onlineOrdersAtom)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    const userId = user.id
    const getOnlineOrderById = async () => {
      try {
        setLoading(true)
        const resp = await storeApi.getOnlineOrder(userId)
        const data = await resp.data
        setOnlineOrders(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getOnlineOrderById()
  }, [])
  const onlineOrderEle =
    onlineOrders &&
    onlineOrders.map((onlineOrder) => {
      return <OnlineOrderItem onlineOrder={onlineOrder} />
    })
  return (
    <Container maxWidth="md" className="mt-10">
      {onlineOrderEle}
    </Container>
  )
}

export default OnlineOrder

const OnlineOrderItem = ({ onlineOrder }) => {
  const [user] = useAtom(userAtom)
  const [address, setAddress] = useState(null)
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getOnlineOrder = async () => {
      try {
        setLoading(true)
        const addressRes = await storeApi.getAddress(onlineOrder.addressId)
        const addressData = await addressRes.data
        setAddress(addressData)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getOnlineOrder()
  }, [])
  useEffect(() => {
    if (onlineOrder) {
      setProducts(onlineOrder.products)
    }
  }, [onlineOrder])
  const productEle =
    products &&
    products.map((product) => {
      console.log(product)
      return <ProductCard product={product} />
    })

  return (
    address && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row',
          border: '1px solid #808080',
          borderRadius: '1rem',
          marginBottom: '1rem',
          padding: '1rem',
        }}
      >
        <Box sx={{ width: '300px' }}>
          <Typography variant="body1" component="h2">
            Tên người nhận :{user.userName}
          </Typography>
          <Typography variant="body1" component="h2">
            Số điện thoại :{address.cellphone}
          </Typography>
          <Typography variant="body1" component="h2">
            Địa chỉ: {address.street}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>{productEle}</Box>
      </Box>
    )
  )
}

const ProductCard = ({ product }) => {
  const [productInfo, setProductInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true)
        const data = await storeApi.getProduct(product.productId)
        setProductInfo(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getProduct()
  }, [])
  console.log(productInfo)
  return (
    productInfo && (
      <Box className="pl-3">
        <Typography variant="body1" component="h2">
          Tên sản phẩm: {productInfo.title}
        </Typography>
        <Typography variant="body1" component="h2">
          Số lượng: {product.quantity}
        </Typography>
        <Typography variant="body1" component="h2">
          Tạm tính: {product.quantity * productInfo.price}
        </Typography>
      </Box>
    )
  )
}
