import React from 'react'
import { TextField, Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import storeApi from '../services/storeApi'
import { navigate } from 'gatsby'
const RegisterForm = () => {
  const methods = useForm()
  const errors = methods.formState.errors
  const { password } = methods.watch()
  const onSubmit = async (data) => {
    const { username, password } = data
    storeApi.register({ username, password })
    navigate('../')
  }

  return (
    <div className="border border-gray rounded-sm shadow-lg h-96 w-96 p-3">
      <div className="text-3xl mb-6">Register</div>
      <FormProvider {...methods}>
        <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Tên đăng nhập"
            variant="outlined"
            {...methods.register('username', {
              minLength: {
                value: 5,
                message: 'Tên tài khoản cần ít nhất 5 ký tự', // JS only: <p>error message</p> TS only support string
              },
            })}
            helperText={errors.username && errors.username.message}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Mật khẩu"
            variant="outlined"
            type="password"
            {...methods.register('password', {
              minLength: {
                value: 5,
                message: 'Mật khẩu cần ít nhất 5 ký tự', // JS only: <p>error message</p> TS only support string
              },
            })}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Nhập lại mật khẩu"
            variant="outlined"
            type="password"
            {...methods.register('cfPassword', {
              minLength: {
                value: 5,
                message: 'Mật khẩu cần ít nhất 5 ký tự', // JS only: <p>error message</p> TS only support string
              },
              validate: (value) =>
                value === password || 'Xác nhận mật khẩu không chính xác',
            })}
            helperText={errors.cfPassword && errors.cfPassword.message}
          />
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-blue-500"
            >
              Đăng ký
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default RegisterForm
