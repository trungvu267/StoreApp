import React from 'react'
import { TextField, Button, Tabs, Tab, Typography, Box } from '@mui/material'
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Login = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col  ">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Đăng nhập" {...a11yProps(0)} />
          <Tab label="Đăng ký" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterForm />
      </TabPanel>
    </div>
  )
}

export default Login

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

const RegisterForm = () => {
  return (
    <div className="border border-gray rounded-sm shadow-lg h-96 w-96 p-3">
      <div className="text-3xl mb-6">Register</div>
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
        <TextField
          fullWidth
          id="outlined-basic"
          label="Nhập lại mật khẩu"
          variant="outlined"
        />
        <div>
          <Button fullWidth variant="contained" className="bg-blue-500">
            Đăng ký
          </Button>
        </div>
      </form>
    </div>
  )
}
