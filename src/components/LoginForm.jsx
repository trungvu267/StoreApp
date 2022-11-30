import React from 'react'
import { TextField, Button } from '@mui/material'
const LoginForm = () => {
  return (
    <div className="border border-gray rounded-sm shadow-lg h-96 w-96 p-3">
      <div className="text-3xl mb-6">Login</div>
      <form className="space-y-6">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Tên đăng nhập"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Mật khẩu"
          variant="outlined"
        />
        <div className="mt-6">
          <Button fullWidth variant="contained" className="bg-blue-500">
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  )
}
export default LoginForm
