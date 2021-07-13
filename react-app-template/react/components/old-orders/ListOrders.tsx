import React from 'react'
import styled from 'styled-components'

import RequestOrders from './RequestOrders'

const ListOrders: StorefrontFunctionComponent= () => {
  return (
    <>
      <Content>
        <Back href="/account#/profile">Voltar</Back>
        <TitlePage>Pedidos antigos</TitlePage>
        <RequestOrders />
      </Content>
    </>
  )
}

const Content = styled.Div`
  @media (max-width: 575.98px) {
    margin: 0 20px;
  }
`

const TitlePage = styled.h1`
  color: #184077;
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  margin-bottom: 30px;
`

const Back = styled.a`
  color: #707070;
  display: block;
  display: none;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 30px;

  @media (max-width: 575.98px) {
    display: block;
  }
`

export default ListOrders
