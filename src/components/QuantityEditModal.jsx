import React from 'react'
import { Box, Modal, Typography, Button, ButtonGroup } from '@mui/material'

import IncrementIcon from '@mui/icons-material/Add'
import DecrementIcon from '@mui/icons-material/Remove'
import CheckIcon from '@mui/icons-material/Check'
import { useAtom } from 'jotai'
import {
  selectedCartItemIdAtom,
  cartItemsAtom,
} from '../states/selectedCardItem'
import { getCartItemById } from '../utils/helper'
const QuantityEditModal = ({ open, handleClose }) => {
  const [selectedCartItemId] = useAtom(selectedCartItemIdAtom)
  const [cartItems, setCartItems] = useAtom(cartItemsAtom)
  const [selectedCardItem, setSelectedCartItem] = React.useState({})
  React.useEffect(() => {
    setSelectedCartItem(getCartItemById(selectedCartItemId, cartItems))
  }, [selectedCartItemId])
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -5%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const handleDecrementBtn = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity === 0 ? 0 : item.quantity - 1,
          }
        }

        return item
      })
    )
  }
  const handleIncrementBtn = (id) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    )
  }
  return selectedCartItemId ? (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Change Quantity
        </Typography>
        <Box id="modal-modal-description" sx={{ my: 2 }}>
          <div className="flex flex-row justify-start items-center space-x-3">
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleDecrementBtn(selectedCartItemId)}
            >
              <DecrementIcon />
            </Button>
            <div>{getCartItemById(selectedCartItemId, cartItems).quantity}</div>
            <Button
              variant="outlined"
              size="small"
              color="success"
              onClick={() => handleIncrementBtn(selectedCartItemId)}
            >
              <IncrementIcon />
            </Button>
          </div>
        </Box>
        <Button size="small" color="success" variant="outlined">
          <CheckIcon />
        </Button>
      </Box>
    </Modal>
  ) : null
}

export default QuantityEditModal
