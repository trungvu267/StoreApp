import * as React from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const IndexPage = () => {
  return (
    <main>
      <Layout />
      <div className="max-w-5xl mx-auto my-5 grid grid-cols-3 gap-2">
        {<ProductCard />}
        {<ProductCard />}
        {<ProductCard />}
        {<ProductCard />}
        {<ProductCard />}
      </div>
      <ToastContainer
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
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
