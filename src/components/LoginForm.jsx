import React from 'react'
import { TextField, Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import storeApi from '../services/storeApi'
import { userAtom } from '../states/user.state'
import { useAtom } from 'jotai'
import { errorToast } from '../utils/toastify'
import { navigate } from 'gatsby'
const LoginForm = () => {
  const [user, setUser] = useAtom(userAtom)
  const methods = useForm()
  const errors = methods.formState.errors
  const onSubmit = async (data) => {
    const { username, password } = data
    try {
      const response = await storeApi.login({ username, password })
      const data = await response.data
      setUser(data)
      navigate('../')
    } catch (error) {
      console.log(error)
      errorToast('Đăng nhập thất bại')
    }
  }
  console.log(user)
  return (
    <div className="border border-gray rounded-sm shadow-lg h-96 w-96 p-3">
      <div className="text-3xl mb-6">Login</div>
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
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-blue-500"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
export default LoginForm
