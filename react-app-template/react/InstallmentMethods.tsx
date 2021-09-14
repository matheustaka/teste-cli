import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useProduct } from 'vtex.product-context'

export interface Default {
  id: string;
}

const InstallmentMethods: StorefrontFunctionComponent<Default> = ({id = 'modal'}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const productContextValue = useProduct()
  const [totalPrice, setTotalPrice] = useState([]) as any
  const [installmentCassol, setInstallmentCassol] = useState([]) as any
  const [installmentMastercard, setInstallmentMastercard] = useState([]) as any

  useEffect(() => {
    const installmentsCassol = [] as any
    const installmentsMastercard = [] as any

    productContextValue?.selectedItem?.sellers[0]?.commertialOffer?.Installments.forEach(
      (card) => {
        if (card.PaymentSystemName === 'Cartão Cassol') {
          installmentsCassol.push(card)
          setInstallmentCassol(installmentsCassol)
        } else if (card.PaymentSystemName === 'Mastercard') {
          installmentsMastercard.push(card)
          setInstallmentMastercard(installmentsMastercard)
        }
      }
    )

    const price =
      productContextValue?.selectedItem?.sellers[0]?.commertialOffer?.Price

    setTotalPrice(price ?? 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOutsideClick = (evt) => {
    if(evt.target.id === id) setIsModalVisible(false)
  }

  const InstallmentModal = () => {
    return (
      <>
        <Modal id={id} className="modal" onClick={handleOutsideClick}>
          <ModalContent>
            <Header>
              <Close onClick={() => setIsModalVisible(false)} />
              <Title>Formas de Pagamento</Title>
            </Header>
            <Content>
              <Installment>
                <CreditCard>Cartão de Crédito</CreditCard>
                <InstallmentContent>
                  {installmentMastercard.map((cards, index) => (
                    <Index key={index}>
                      <Quantity>
                        {cards.NumberOfInstallments}x{' '}
                        {cards.InterestRate !== 0 ? 'com juros' : 'sem juros'}
                      </Quantity>
                      <ParcelValue>
                        {cards.Value.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </ParcelValue>
                    </Index>
                  ))}
                </InstallmentContent>
              </Installment>
              {installmentCassol.length > 0 ? (
                <Installment className="center">
                  <CassolCard>Cartão Cassol</CassolCard>
                  <InstallmentContent>
                    {installmentCassol.map((cards, index) => (
                      <Index key={index}>
                        <Quantity>
                          {cards.NumberOfInstallments}x{' '}
                          {cards.InterestRate !== 0 ? 'com juros' : 'sem juros'}
                        </Quantity>
                        <ParcelValue>
                          {cards.Value.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </ParcelValue>
                      </Index>
                    ))}
                  </InstallmentContent>
                </Installment>
              ) : null}
              <Installment>
                <Billet>Boleto Bancário</Billet>
                <InstallmentContent>
                  <Strong>
                    {totalPrice.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </Strong>
                </InstallmentContent>
              </Installment>
            </Content>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <>
      <Text onClick={() => setIsModalVisible(true)}>Parcelamento &gt;</Text>
      {isModalVisible ? <InstallmentModal /> : null}
    </>
  )
}

const Text = styled.p`
  color: #385a83;
  cursor: pointer;
  font-size: 15px;
  line-height: 18px;
  margin-left: -40%;
  text-decoration: underline;

  @media (min-width: 992px) {
    margin-left: -70%;
  }
  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const Modal = styled.form`
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 999;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`

const ModalContent = styled.form`
  overflow: scroll;
  text-align: right;
  background-color: #fff;
  border-radius: 3px;
  display: inline-block;
  height: 85%;
  padding: 20px 50px 40px 50px;
  text-align: right;
  vertical-align: middle;

  @media (min-width: 992px) {
    width: 900px;
  }
`

const Header = styled.header``

const Close = styled.span`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: inline-block;
  text-align: right;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAflJREFUSA2tlTFWAkEQRFlNDPEE7A3EjHANjcQMI9YbcAPxBtxAiDQTTwAhmUtm5noDPAH+WmdgGBuEp/1evZ2p7qma6V2YpLYjer1emiTJ1XK5zChLQRMoClCSm5J7GQwGpUgrEouUMPwdyME+MaTo3jL6YYB4m+IHUAeHxILiW0zG4aLjcIJ4zvwRnIT8nmOt6bRarY/ZbFb4NasTuJ0/+8Qfn9f+JJWB6/krooe2Zds+1K5zvZMjV9HnaYnP4T9djfVQTjVxSKsv8sjtvqtJFHN20ITLgGUiLnM1lklX2jpBG1jRoKCJQEEyA6GJFy9UQ64BrGjLILMycHUwMUxi8YmrtWQyGaRWxnGWidrid75LXBKNhB0udxj41ILBhWtXzbXlN/FqrU6wT6x+L0GxxQXp76EMrC8gLNzoufFOwtp4PJdBGbPBfEMcXm2xXnywZGNYymC6Qa0nlrheuvXiVWvFVAZjKwP3vuNriU3KLRpj/180pKBrFBVwKZCgFQvIEjSN5IgN5jqBog+sY2rhNnFSVc4Sl1ZfBZUBTiXjHPxX5E6ztrpwuCTedFng0P6ji261J6+xMhChmwiTOcNLcOitprbchOLM1yfQROFOoh2cAqu/KotjBNFBfBYnqq8oJv2cX23KWC3LQArOgEKnLMEUjBHW2IwvLCzMvLL1q6YAAAAASUVORK5CYII=');
`

const Content = styled.form`
  display: block;
  align-items: flex-start;
  justify-content: center;

  @media (min-width: 992px) {
    display: flex;
  }
`

const Installment = styled.form`
  display: block;

  @media (max-width: 767.98px) {
    margin: 25px 0;

    &.center {
      border-top: 1px solid #e9e9e9;
      border-bottom: 1px solid #e9e9e9;
    }
  }

  @media (min-width: 992px) {
    &.center {
      border-left: 1px solid #e9e9e9;
      border-right: 1px solid #e9e9e9;
    }
  }
`

const CreditCard = styled.h2`
  font-size: 16px;
  line-height: 19px;
  position: relative;
  text-align: center;

  @media (max-width: 767.98px) {
    margin-top: 25px;
  }

  &:before {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAABHNCSVQICAgIfAhkiAAAAN5JREFUSEvtlrFtwlAURc+lCOniKlDCBhnhZwNnAhjBlUmZEtLgbOANMgKfEbKB6UyFWzc89IWEQnq+kPLfAufqPOnqKnNF9shwbVgulBHnGoNq71dfGruyBs3icK8pR+xNI1ceQOrpJ52vuhhBnl2ZD9C3QTCwMLBt6z9dDHhgjN27A9sE7r0EoAGrYxkATYD5LwPx0NekywtSgP9uwOBHqIjlwTi+CK3vqQdSEyYDyUAyQNP61TRWE/6ZZJdR2kAYJrc/w0IVZ6BXnWf5Q2UoFzzdHh8ItoPBR+uX9QnAvML9jxfPjwAAAABJRU5ErkJggg==');
    content: '';
    display: inline-block;
    height: 24px;
    left: 6%;
    margin-right: 5px;
    position: absolute;
    top: -5px;
    width: 32px;
  }
`

const CassolCard = styled.h2`
  font-size: 16px;
  line-height: 19px;
  position: relative;
  text-align: center;

  @media (max-width: 767.98px) {
    margin-top: 25px;
  }

  &:before {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAABHNCSVQICAgIfAhkiAAAAWNJREFUSEvtlkFOwkAYhb+/JuDOblR24g04wnCDegI5AiwEli4FF8UbcAO5AeMN9AZ1V3Vht5jQ3wwEpCQGFm1DorOYNjOd/728v3194pu2f0w1VDQQxKecESmM3uzgQWqmOwa5Lgc3i5KiV3JueolbnjGrJ3a0uC96nJlu4CGPCk6BnoI+xXZoigZe1a+ZvgGdOtxDIUAEOi5LAZA60NpQoDzoLNK6Bf8E/roCCi+CtMvSQUkbgoSH5AP5OeGpuWkc4YVLNfV1eZULN89JOx/2/rlQJ3TFFZ0IEsT2zjrg7bXCCQD12N5lnLVm+i0gcqQKJzBnnjipf3upCyeQkvrvdjjZJOBAV8QKJ6Ck4Yyv5ipfuNRVpTIVvE4pLXD/ekUTQRYq/MQ9aRZOYB8zy7TARTKBz9gOLvc5nMczW5FsHUoj95nkAbCrhqLOin2QpixjeWWkSCBwsutwPvvOIb1b5xXflf4RDLaeonsAAAAASUVORK5CYII=');
    content: '';
    display: inline-block;
    height: 24px;
    left: 12%;
    margin-right: 5px;
    margin-right: 5px;
    position: absolute;
    top: -5px;
    width: 32px;
  }
`

const Billet = styled.h2`
  font-size: 16px;
  line-height: 19px;
  position: relative;
  text-align: center;

  @media (max-width: 767.98px) {
    margin-top: 25px;
  }

  &:before {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAABHNCSVQICAgIfAhkiAAAAc1JREFUSEvtlr9LHEEcxd93/XUGTOTU2+tCuoApTCVB4UaENBZqZRkllYQQBbnhQPBCmtwE4oH+AdqkSBnsLJw98EI6rVIFDDa7EuWihT9W5yu7emLg8MIVC8IObDHMd+d9eMvyHnWKmc4E2hYBTCKixeAtgjXr6o+a0iK7AtCriLRvZBhcIVjPKS0kA/z7BGd9FV2sRAFiC1kk4B1AU1UAx9VKBOLdA9mOP8Y/x/fF45v9pjqqBRbOtjzwofMn/zV7fU9aZPMALQD8/h+ALpF72gLzk5m/eY4atYX8QMA8DCbcUuGrnZG/QPzY06o5lZl7YVFTGeBVV6vJlJDLFvDGML/cc9S6LWQFzKeeo+z0kBwBY43BRU+r2RggdiB2IHYgduA+OTD3DKBe31yUD0qfd+2hXD/hPOFufHLqZUGPkINkYPZKhXLDWXBXNNcDuP1uwwCpjJy2CK8Ncy5MuEz2C0C25xSG6wHYQq4B7HtajTcMEHkcB7Yl+98+PLCa/WohCfc/lg5rfY7wrL3rLCwkIp9IHu+33jl7fU+NvwA7ri48iaKOBRpVAAMev11KdwAETxRLMPCXQH10VctbiwwaI+BRFOoMbBNoJqjllxGSBf3V3u5LAAAAAElFTkSuQmCC');
    content: '';
    display: inline-block;
    height: 24px;
    left: 8%;
    margin-right: 5px;
    margin-right: 5px;
    position: absolute;
    top: -5px;
    width: 32px;
  }
`

const InstallmentContent = styled.form`
  text-align: center;
  width: 250px;

  @media (max-width: 767.98px) {
    margin-bottom: 25px;
  }
`

const Index = styled.form``

const Quantity = styled.span`
  font-size: 14px;
  font-size: 15px;
  font-weight: 400;
`

const ParcelValue = styled.strong`
  color: #000;
  font-size: 14px;
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 5px;
  margin-left: 10px;
`

const Strong = styled.strong`
  display: block;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 10px;
`

const Title = styled.form`
  color: #184077;
  font-size: 21px;
  font-weight: 600;
  line-height: 25px;
  margin-bottom: 25px;
  text-align: center;

  @media (max-width: 767.98px) {
    margin-top: 25px;
  }
`

export default InstallmentMethods
