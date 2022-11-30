import * as React from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import ToastContainer from '../components/ToastContainer'
import storeApi from '../services/storeApi'
import { productsAtom } from '../states/products.states'
import { useAtom } from 'jotai'
const IndexPage = () => {
  const [products, setProducts] = useAtom(productsAtom)
  React.useEffect(() => {
    const getProducts = async () => {
      const data = await storeApi.getProducts()
      setProducts(data)
    }
    getProducts()
  }, [])
  const productsElement =
    products &&
    products.map((product) => {
      return <ProductCard product={product} />
    })
  return (
    <main>
      <Layout />
      <div className="max-w-5xl mx-auto my-5 grid grid-cols-3 gap-2">
        {productsElement}
      </div>
      <ToastContainer />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
