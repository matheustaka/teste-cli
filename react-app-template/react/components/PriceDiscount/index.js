import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';

const PriceDiscount = () => {

  const productContext = useProduct();

  console.log('product context', productContext);
  const [price, setPrice] = useState();

  useEffect( () => {
    setPrice(productContext.product.priceRange.sellingPrice.highPrice)
  }, [productContext])

  console.log(price);
  return(
    <h1> PriceDiscount </h1>
  )
}

export default PriceDiscount
