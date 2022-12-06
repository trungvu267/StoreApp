import * as React from 'react'
import { Box, Button, Typography, Modal, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import storeApi from '../services/storeApi'
import { userAtom } from '../states/user.state'
import { successToast, errorToast } from '../utils/toastify'
import { selectedAddressAtom } from '../states/address.state'
import { addressModalAtom } from '../states/modal.state'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #808080',
  boxShadow: 24,
  p: 4,
}

export default function AddressModal() {
  const [user] = useAtom(userAtom)
  const [open, setOpen] = useAtom(addressModalAtom)
  const [, setSelectedAddress] = useAtom(selectedAddressAtom)

  const handleClose = () => setOpen(false)
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    if (!user) return
    const { street, cellphone } = data
    const userId = user.id
    try {
      const response = await storeApi.createAddress({
        userId,
        street,
        cellphone,
      })
      const data = await response.data
      setSelectedAddress(data)
      successToast('Tạo địa chỉ mới thành công')
      setOpen(false)
    } catch (error) {
      console.log(error)
      errorToast('Có lỗi xảy ra')
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Nhập địa chỉ mới
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              label="Địa chỉ nhận hàng"
              variant="outlined"
              sx={{ mb: 3 }}
              fullWidth
              {...register('street')}
            />
            <TextField
              label="Số điện thoại nhận hàng"
              variant="outlined"
              sx={{ mb: 3 }}
              fullWidth
              {...register('cellphone')}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <Button
              variant="outlined"
              size="small"
              color="success"
              className="w-full m-1"
              type="submit"
            >
              Xác nhận
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="warning"
              className="w-full m-1"
              onClick={handleClose}
            >
              Thoát
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
