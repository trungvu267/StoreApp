import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { navigate } from 'gatsby'
import { loginModalAtom } from '../states/modal.state'
import { useAtom } from 'jotai'
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

export default function LoginModal() {
  const [open, setOpen] = useAtom(loginModalAtom)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thông báo
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Vui lòng đăng nhập để sử dụng tính năng này
        </Typography>
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
            onClick={() => {
              navigate('../login')
            }}
          >
            Đăng nhập
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
      </Box>
    </Modal>
  )
}
