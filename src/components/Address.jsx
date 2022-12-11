import React, { useEffect, memo, useCallback } from 'react'
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import { addressModalAtom } from '../states/modal.state'
import { useAtom } from 'jotai'
import AddressModal from '../components/AddressModal'
import ToastContainer from '../components/ToastContainer'
import { userAtom } from '../states/user.state'
import storeApi from '../services/storeApi'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'
import { errorToast, successToast } from '../utils/toastify'
import {
  addressesAtom,
  editAddressAtom,
  selectedAddressAtom,
} from '../states/address.state'
import { RESET } from 'jotai/utils'

import { editAddressModalAtom } from '../states/modal.state'
import EditAddressModal from './EditAddressModal'
const Addresses = () => {
  const [, setOpen] = useAtom(addressModalAtom)
  const [user] = useAtom(userAtom)
  const [addresses, setAddresses] = useAtom(addressesAtom)
  const [, setSelectedAddress] = useAtom(selectedAddressAtom)

  useEffect(() => {
    const getAddressesByUserId = async () => {
      try {
        const response = await storeApi.getAddressesByUserId(user.id)
        const data = await response.data
        setAddresses(data)
      } catch (error) {
        console.log('có lỗi khi lấy địa chỉ')
        console.log(error)
      }
    }
    getAddressesByUserId()
  }, [addresses])
  const addressEle = addresses.map((address) => {
    return <AddressCard address={address} />
  })
  useEffect(() => {
    if (addresses.length === 1) {
      setSelectedAddress(addresses[0])
    }
  }, [addresses])
  return (
    <Container className="mx-auto">
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Địa chỉ nhập hàng mới
      </Button>
      <Typography variant="h5" component="div" align="center" sx={{ mb: 5 }}>
        Danh sách địa chỉ nhận hàng
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4.5rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {addressEle}
      </Box>
      <AddressModal />
      <EditAddressModal />
      <ToastContainer />
    </Container>
  )
}

export default memo(Addresses)

export function AddressCard({ address, hidden = false }) {
  const [, setOpen] = useAtom(editAddressModalAtom)
  const [editAddress, setEditAddress] = useAtom(editAddressAtom)
  const [selectedAddress, setSelectedAddress] = useAtom(selectedAddressAtom)
  const handleSetDefaultAddress = useCallback(
    (address) => {
      setSelectedAddress(address)
      successToast('Chọn địa chỉ mặc định thành công')
    },
    [selectedAddress]
  )
  // const handleSetDefaultAddress = (address) => {
  // }
  const handleEditAddress = (address) => {
    setOpen(true)
    setEditAddress(address)
  }
  const handleRemoveBtn = async (addressId) => {
    try {
      await storeApi.removeAddress(addressId)
      if (selectedAddress.id === addressId) {
        setSelectedAddress(RESET)
      }
      errorToast('Xóa địa chỉ thành công ')
    } catch (error) {
      console.log('có lỗi xảy ra khi xóa địa chỉ')
    }
  }

  return address ? (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderRadius: '8px',
        }}
      >
        <CardContent>
          <Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Địa chỉ
            </Typography>
            <Typography variant="title1" component="div">
              {address.street || ''}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Số điện thoại
            </Typography>
            <Typography variant="title1" component="div">
              {address.cellphone || ''}
            </Typography>
          </Box>
        </CardContent>
        {!hidden && (
          <CardContent>
            <Button
              variant="outlined"
              fullWidth
              color="success"
              onClick={() => handleSetDefaultAddress(address)}
            >
              Chọn làm địa chỉ mặc định
            </Button>
          </CardContent>
        )}
        {
          <CardContent>
            <Button
              variant="outlined"
              startIcon={<CreateIcon />}
              sx={{ mr: 2 }}
              onClick={() => handleEditAddress(address)}
            >
              Thay đổi
            </Button>
            {!hidden ? (
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => handleRemoveBtn(address.id)}
              >
                Xóa
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => handleRemoveBtn(address.id)}
                disabled
              >
                Xóa
              </Button>
            )}
          </CardContent>
        }
      </Box>
    </Card>
  ) : null
}
