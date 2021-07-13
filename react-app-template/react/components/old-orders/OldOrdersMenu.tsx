import React, { useState } from 'react'
import styled from 'styled-components'
import Axios from 'axios'

const OldOrdersMenu: StorefrontFunctionComponent = () => {
  const [name, setName] = useState('')

  Axios.get('/no-cache/profileSystem/getProfile')
    .then((response) => {
      setName(response.data.FirstName)
    })
    .catch((error) => {
      return error
    })

  return (
    <Menu>
      <MenuInfo>
        <Image />
        <Name>
          Olá,<Name>{name}</Name>
        </Name>
      </MenuInfo>
      <MenuItems>
        <Item>
          <a href="/account#/profile">Dados pessoais</a>
        </Item>
        <Item>
          <a href="/account#/addresses">Endereços</a>
        </Item>
        <Item>
          <a href="/account#/orders">Pedidos</a>
        </Item>
        <Item className="active">
          <a href="/old-orders">Pedidos antigos</a>
        </Item>
        <Item>
          <a href="/account#/cards">Cartões</a>
        </Item>
        <Item>
          <a href="/loggout">Sair</a>
        </Item>
      </MenuItems>
    </Menu>
  )
}

const Menu = styled.Div`
  width: 230px;

  @media (max-width: 575.98px) {
    display: none;
  }
`

const MenuInfo = styled.Div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

const Image = styled.image`
  background: url('data:image/png;base64,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');
  display: inline-block;
  height: 66px;
  margin-right: 15px;
  width: 66px;
`

const Name = styled.span`
  color: #707070;
  display: block;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  max-width: 100px;
`

const MenuItems = styled.ul`
  display: block;
  list-style: none;
  margin-top: 30px;
  padding-left: 0;
`

const Item = styled.li`
  margin-bottom: 25px;
  padding-left: 10px;

  &.active a {
    font-weight: 700;
    padding: 10px 0;
    position: relative;

    &:before {
      background: #385a83;
      content: '';
      height: 100%;
      left: -10px;
      position: absolute;
      top: 0;
      width: 2px;
    }
  }

  a {
    color: #707070;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    text-decoration: inherit;

    &:hover {
      font-weight: 700;
    }
  }
`

export default OldOrdersMenu
