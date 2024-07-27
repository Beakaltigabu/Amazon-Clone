import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../components/Layout/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../components/Product/ProductCard'
import Loader from '../../components/Loader/Loader'

function ProductDetail() {

  const { productId } = useParams()
  const [product, setProduct]=useState({})

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data)
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [productId])




  return (
    <LayOut>
      {loading ? (
        <Loader/>
      ) : Object.keys(product).length > 0 ? (
        <ProductCard product={product}
                      flex={true}
                      renderDesc={true}
                      renderAdd={true}
                      />
      ) : (
        <p>No product found</p>
      )}
    </LayOut>
  )

}

export default ProductDetail
