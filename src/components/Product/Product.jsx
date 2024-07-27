import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import ProductCard from './ProductCard';
import classes from './Product.module.css'
import Loader from '../Loader/Loader';

function Product() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    Axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProduct(res.data)
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <section className={classes.products_container}>
      {products.length > 0 ? (
        products.map((singleProduct) => (
          <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true} />
        ))
      ) : (
       < Loader/>
      )}
    </section>
  )
}

export default Product
