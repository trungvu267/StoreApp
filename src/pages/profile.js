import React from 'react'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import { Container } from '@mui/material'
import ToastContainer from '../components/ToastContainer'

const profile = () => {
  return (
    <div>
      <Layout />
      <Container maxWidth="md">
        <Profile />
      </Container>
      <ToastContainer />
    </div>
  )
}

export default profile
