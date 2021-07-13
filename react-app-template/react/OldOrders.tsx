import React from 'react'
import styled from 'styled-components'

import ListOrders from './components/old-orders/ListOrders'
import OldOrdersMenu from './components/old-orders/OldOrdersMenu'

const OldOrders: StorefrontFunctionComponent = () => {
  return (
    <Container>
      <OldOrdersMenu />
      <ListOrders />
    </Container>
  )
}

const Container = styled.Div`
  display: flex;
  margin: 30px auto;
  max-width: 1250px;
`

export default OldOrders
