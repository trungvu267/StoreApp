import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import testImage from '../../assets/images/products/yellowT.png'
import { toast } from 'react-toastify'
export default function ProductCard() {
  const handleAddToCartBtn = () => {
    toast('🦄 Add To Cart Successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  return (
    <Card sx={{ maxWidth: 200 }} className="col-span-1 mx-auto">
      <div className="p-3 bg-blue-200">
        <CardMedia
          component="img"
          height="50"
          image={testImage}
          alt="green iguana"
          className="mx-auto"
        />
      </div>
      <CardContent className="pb-0 mb-0">
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
      </CardContent>
      <CardActions className="flex flex-col m-2 p-0 items-center space-y-1">
        <Button
          variant="outlined"
          size="small"
          color="success"
          className="w-full"
          onClick={handleAddToCartBtn}
        >
          Add to cart
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="warning"
          className="w-full m-0"
        >
          View Product detail
        </Button>
      </CardActions>
    </Card>
  )
}
