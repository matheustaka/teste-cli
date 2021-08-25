import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useProduct } from 'vtex.product-context'
const MessageCalculator: StorefrontFunctionComponent = () => {
  const productContextValue = useProduct()
  const [unitMultiplier, setUnitMultiplier] = useState() as any
  const [sellingPrice, setSellingPrice] = useState() as any

  const [load, setLoad] = useState<boolean>(false)

  // Calcular o preço da caixa
  // const calculatePriceBox = (n: number, n2: number) => {
  //   return n * n2
  // }


  const RenderPriceBox = () => {
    return (
      <>
        {productContextValue?.selectedItem?.measurementUnit === 'm²' ? (
          <Label>
            Este produto é vendido por caixa. Cada caixa contém: {unitMultiplier} m². O preço do m² custa <BoxPrice>{ sellingPrice }</BoxPrice>
          </Label>
        ) : null}
      </>
    )
  }
  useEffect(() => {
    const unit = productContextValue?.product?.items[0]?.unitMultiplier
    const selPrice = productContextValue?.product?.priceRange?.sellingPrice?.highPrice
    setUnitMultiplier(Number(unit));
    setSellingPrice(Number(selPrice).toFixed(2))

    console.log(productContextValue);

    setLoad(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {load ? <RenderPriceBox /> : null}


    </>
  )
}

const Label = styled.p`
  color: #2e2e2e;
  font-size: 12px;
  line-height: 18px;
`
const BoxPrice = styled.strong`
  color: #385a83;
`
export default MessageCalculator
