import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context';
import styled from 'styled-components';

const DiscountMessage = styled.p`
  margin: 0 0 10px 0;
  color: #385a83;
  font-size: 14px;
`
const PriceDiscount = () => {

  const productContext = useProduct();
  const [price, setPrice] = useState();

  const clusterValidate = productContext.product.items[0].unitMultiplier

  // useEffect( () => {
  //   setPrice(productContext.product.priceRange.sellingPrice.highPrice)
  // }, [productContext])

  return(
    <DiscountMessage> <strong>10%</strong> de desconto à vista </DiscountMessage>
  )
}

export default PriceDiscount
