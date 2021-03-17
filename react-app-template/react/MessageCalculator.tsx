import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useProduct } from 'vtex.product-context'

const MessageCalculator: StorefrontFunctionComponent = () => {
  const productContextValue = useProduct()
  const [unitMultiplier, setUnitMultiplier] = useState() as any

  useEffect(() => {
    const unit = productContextValue?.product?.items[0]?.unitMultiplier

    setUnitMultiplier(unit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {productContextValue?.selectedItem?.measurementUnit === 'm²' ? (
        <Label>
          Produto vendido por caixa. Cada caixa contém: {unitMultiplier} m²
        </Label>
      ) : null}
    </>
  )
}

const Label = styled.p`
  color: #2e2e2e;
  font-size: 12px;
  line-height: 18px;
`

export default MessageCalculator
