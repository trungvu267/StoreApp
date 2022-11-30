import { toast } from 'react-toastify'
const toastSetting = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}
export const successToast = (message = '') => {
  return toast.success(message, toastSetting)
}
export const infoToast = (message = '') => {
  return toast.info(message, toastSetting)
}
export const errorToast = (message = '') => {
  return toast.error(message, toastSetting)
}
