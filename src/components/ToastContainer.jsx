import { ToastContainer as ToastConfig } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

const ToastContainer = () => {
  return (
    <ToastConfig
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  )
}

export default ToastContainer
