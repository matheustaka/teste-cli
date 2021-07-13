import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { Ring } from 'react-awesome-spinners'

export interface Orders {
  nomeProduto: string,
  quantidade: string,
  preco: string,
  subtotal: string,
  urlProdutoVTEX: string,
  armazemId: string,
  bonusutilizado: string,
  passo: string,
  dataPedido: string,
  tipoPgto: string,
  dataEntrega: string,
  bairro: string,
  cidade: string,
  estado: string,
  endereco: string,
  cep: string,
  metodoPagamento: string,
  total: string,
  valorFrete: string,
}

const RequestOrders: StorefrontFunctionComponent = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Orders[]>([])
  let objUnify: Array<Orders> = []

  useEffect(() => {
    let config = {
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
        'REST-Range': 'resources=0-500'
      }
    }

    axios
        .get('/no-cache/profileSystem/getProfile')
        .then((res) => {
          if(!res.data.Email) return

          axios
            .get(
              `/api/dataentities/OB/search?_where=email=${res.data.Email}&_fields=codigo,armazemId,bonusutilizado,passo,dataEntrega,dataPedido,cidade,estado,endereco,bairro,cep,metodoPagamento,total,valorFrete,tipoPgto`, config
            )
            .then((data) => {
              var obTable = data.data

              obTable.forEach((elementObTable, index) => {
                axios
                .get(
                  `/api/dataentities/OI/search?_where=codigoPedido=${elementObTable.codigo}&_fields=nomeProduto,quantidade,preco,subtotal,urlProdutoVTEX`, config
                )
                .then((response) => {
                  var oiTable = response.data
                  let obj = {} as Orders

                  oiTable.map((item) => {
                    obj = {
                      nomeProduto: item.nomeProduto,
                      armazemId: data.data[index].armazemId,
                      quantidade: item.quantidade,
                      preco: item.preco,
                      subtotal: item.subtotal,
                      urlProdutoVTEX: item.urlProdutoVTEX,
                      bonusutilizado: data.data[index].bonusutilizado,
                      passo: data.data[index].passo,
                      dataPedido: data.data[index].dataPedido,
                      tipoPgto: data.data[index].tipoPgto,
                      dataEntrega: data.data[index].dataEntrega,
                      bairro: data.data[index].bairro,
                      cidade: data.data[index].cidade,
                      estado: data.data[index].estado,
                      endereco: data.data[index].endereco,
                      cep: data.data[index].cep,
                      metodoPagamento: data.data[index].metodoPagamento,
                      total: data.data[index].total,
                      valorFrete: data.data[index].valorFrete,
                    }

                    objUnify.push(obj)
                  })

                  setOrders(objUnify)
                })
                .catch((error) => {
                  return error
                })
              })
            })
            .catch((error) => {
              return error
            })
        })
        .catch((error) => {
          return error
        })

        setTimeout(() => setLoading(false), 4000)
  }, [])

  const MyList = () => {
    orders.sort(function(a, b){
      var A = a.dataPedido.split("/");
      var B = b.dataPedido.split("/");
      var strA = [ A[2], A[1], A[0] ].join("/");
      var strB = [ B[2], B[1], B[0] ].join("/");
      return strB.localeCompare( strA )
    })

    return (
      <>
        {orders.map((order, index) => (
          <List key={index}>
              <Item>
                <Header>
                  <HeaderItem>
                    Data do pedido
                    <Span>{order.dataPedido}</Span>
                  </HeaderItem>
                  <HeaderItem>
                    Entrega
                    <Span>R$ {order.valorFrete}</Span>
                  </HeaderItem>
                  <HeaderItem>
                    Total
                    <Span>R$ {order.total}</Span>
                  </HeaderItem>
                  <HeaderItem>
                    #{order.armazemId}
                    {order.passo.indexOf("Cancelado") !== 0 ? <Situation>{order.passo}</Situation>: <Cancelad>{order.passo}</Cancelad>}
                  </HeaderItem>
                </Header>
                <ItemContent>
                  <ContentInform>
                    <ItemContentText>
                      <Name>{order.nomeProduto}</Name>
                      <Delivery>Entrega em até 3 dias úteis</Delivery>
                      <Quantity>
                        {order.quantidade} un R$ {order.subtotal}
                      </Quantity>
                    </ItemContentText>
                    <Price>
                      Valor total produto
                      <Span>R$ {order.subtotal}</Span>
                    </Price>
                  </ContentInform>
                  <More>
                    <a href={order.urlProdutoVTEX}>Ver na loja</a>
                  </More>
                  <Payment>
                    <FormPayment>
                      <Color>Forma de Pagamento</Color> - {order.tipoPgto}
                    </FormPayment>
                    <Withdrawn>
                      Entregue em {order.dataEntrega} - {order.endereco},{' '}
                      {order.bairro}, {order.cidade} - {order.estado} CEP{' '}
                      {order.cep}
                    </Withdrawn>
                  </Payment>
                </ItemContent>
              </Item>
          </List>
        ))}
      </>
    )
  }

  return (
    <>
      {loading ? <Ring /> : <MyList /> }
    </>
  )
}

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`

const Item = styled.li`
  border-radius: 10px;
  border: 3px solid #e9e9e9;
  margin-bottom: 30px;
  width: 880px;

  @media (max-width: 575.98px) {
    border-bottom: 1px solid #e9e9e9;
    border-left: inherit;
    border-radius: 0;
    border-right: inherit;
    border-top: inherit;
    width: 100%;
  }
`

const Header = styled.Div`
  align-items: flex-start;
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 575.98px) {
    display: flex;
    flex-wrap: wrap;
  }
`

const HeaderItem = styled.p`
  color: #707070;
  font-size: 12px;
  font-weight: 400;

  @media (max-width: 575.98px) {
    &:nth-child(1) {
      flex: 1 50%;
      order: 1;
    }

    &:nth-child(2) {
      flex: 1 50%;
      text-align: right;
      order: 2;
    }

    &:nth-child(3) {
      flex: 1 50%;
      text-align: left;
      order: 3;
    }

    &:nth-child(4) {
      flex: 1 50%;
      text-align: right;
      order: 5;

      span {
        font-weight: 800;
        width: 110px;
        margin: 5px 35%;
      }
    }

    &:nth-child(5) {
      flex: 1 50%;
      order: 2;
      text-align: left;
      order: 4;
    }

    &:nth-child(6) {
      flex: 1 50%;
      order: 1;
    }
  }
`

const Span = styled.span`
  display: block;
  margin-top: 10px;
`

const Situation = styled.span`
  background-color: #2aba10;
  border-radius: 3px;
  color: #fff;
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
  max-width: 90px;
  padding: 5px 10px;
  text-align: center;
  text-transform: uppercase;
`

const Cancelad = styled.span`
  background-color: #d61016;
  border-radius: 3px;
  color: #fff;
  display: block;
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
  max-width: 90px;
  padding: 5px 10px;
  text-align: center;
  text-transform: uppercase;
`

const ItemContent = styled.Div`
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;

  @media (max-width: 575.98px) {
    display: block;
    padding: 20px;
  }
`

const ContentInform = styled.Div`
  display: flex;

  @media (max-width: 575.98px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`

const ItemContentText = styled.Div`
  display: block;
  width: 270px;

  @media (max-width: 575.98px) {
    width: 100%;
    flex: 1 50%;
  }
`

const Name = styled.p`
  color: #2d2e3a;
  font-size: 11px;
  font-weight: 400;
  margin-top: 0;
  width: 220px;
`

const Delivery = styled.p`
  color: #707070;
  font-size: 10px;
  font-weight: 400;
`

const Quantity = styled.p`
  color: #184077;
  font-size: 11px;
  font-weight: 700;
`

const Price = styled.Div`
  color: #707070;
  font-size: 11px;
  font-weight: 400;
  text-align: center;

  @media (max-width: 575.98px) {
    margin-top: 10px;
    text-align: left;

    span {
      margin-top: 0;
    }
  }
`

const More = styled.Div`
  font-size: 10px;
  font-weight: 400;

  a {
    color: #385a83;
    text-decoration: underline;
  }

  @media (max-width: 575.98px) {
    text-align: center;
    margin: 20px 0;
  }
`

const Payment = styled.Div`
  display: block;
  width: 225px;

  @media (max-width: 575.98px) {
    width: 100%;
  }
`

const FormPayment = styled.p`
  color: #707070;
  font-size: 11px;
  font-weight: 600;
  margin-top: 0;

  @media (max-width: 575.98px) {
    margin: 20px 0;
  }
`

const Color = styled.span`
  color: #385a83;
  font-size: 11px;
  font-weight: 600;
`

const Withdrawn = styled.p`
  color: #707070;
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
`

export default RequestOrders
