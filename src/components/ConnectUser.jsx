import React from 'react'
import { navigate } from 'gatsby'
import { Button, Container } from '@mui/material'
const ConnectUser = () => {
  return (
    <Container
      sx={{
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="text"
        size="small"
        onClick={() => {
          navigate('../login')
        }}
      >
        Đăng nhập để sử dụng tính năng này
      </Button>
    </Container>
  )
}

export default ConnectUser
