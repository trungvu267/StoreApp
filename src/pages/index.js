import * as React from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import storeApi from '../services/storeApi'
import { productsAtom } from '../states/products.states'
import { useAtom } from 'jotai'
const IndexPage = () => {
  const [products, setProducts] = useAtom(productsAtom)
  React.useEffect(() => {
    const getProducts = async () => {
      return await storeApi.getProducts()
    }
    const data = getProducts()
    setProducts(data)
  }, [])
  const productsElement = products.map((product) => {
    return <ProductCard product={product} />
  })
  return (
    <main>
      <Layout />
      <div className="max-w-5xl mx-auto my-5 grid grid-cols-3 gap-2">
        {productsElement}
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
