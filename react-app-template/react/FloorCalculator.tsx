import React from 'react'
import styled from 'styled-components'
import { useProduct } from 'vtex.product-context'

import ModalFloorCalculator from './components/floor-calculator/ModalFloorCalculator'

const FloorCalculator: StorefrontFunctionComponent = () => {
  const productContextValue = useProduct()

  return (
    <Container>
      {productContextValue?.selectedItem?.measurementUnit === 'm²' && productContextValue?.product?.categoryId !== '5083' ? (
        <ModalFloorCalculator />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  margin: 20px 0 10px 0;
`

export default FloorCalculator
