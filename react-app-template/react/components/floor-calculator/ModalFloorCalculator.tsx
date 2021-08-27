import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import MeasuresContent from './MeasuresContent'
import AreaContent from './AreaContent'

import { useProduct } from 'vtex.product-context'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'

const ModalFloorCalculator: StorefrontFunctionComponent = () => {
  const [modal, setModal] = useState(false)
  const [result, setResult] = useState(false)
  const [radios, setRadios] = useState('measures')
  const [unitMultiplier, setUnitMultiplier] = useState() as any
  const productContextValue = useProduct()
  const dispatch = useProductDispatch()

  useEffect(() => {
    const unit = productContextValue?.product?.items[0]?.unitMultiplier

    setUnitMultiplier(unit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [sizes, setSizes] = useState({
    width: '',
    length: '',
    areaTotal: '',
  })

  const [smashs, setSmashs] = useState({
    percent: ''
  }) as any

  const handleChangeInputs = (evt) => {
    const { value } = evt.target

    // Create a mask on the value of the input to convert the comma to dot
    const valueMasked = value.replace(/,/g , '.');
    setSizes({
      ...sizes,
      [evt.target.name]: valueMasked
    })
  }

  const handleChangeRadios = (evt) => {
    const { value } = evt.target

    setRadios(value)
  }

  const handleChangeCheckbox = (evt) => {
    setSmashs({
      percent: evt.target.value
    })
  }

  const handleClickCalc = (e) => {
    e.preventDefault()
    setResult(true)
  }

  const handleShowModal = (e) => {
    e.preventDefault()
    setModal(true)
  }

  const handleHideModal = () => {
    setModal(false)
    setResult(false)
  }

  const clearStates = () => {
    setSizes({
      width: '',
      length: '',
      areaTotal: '',
    })
    setSmashs({
      period: '',
    })
    setResult(false)
    setRadios('measures')
  }

  let totalCalc =
    radios === 'measures'
      ? Number(sizes.width) * Number(sizes.length)
      : Number(sizes.areaTotal)

  if (smashs.percent === 'teenPercent' && smashs.percent === 'fifteenPercent') {
    totalCalc += (10 / 100) * totalCalc + (15 / 100) * totalCalc
  } else if (smashs.percent === 'teenPercent') {
    totalCalc += (10 / 100) * totalCalc
  } else if (smashs.percent === 'fifteenPercent') {
    totalCalc += (15 / 100) * totalCalc
  }

  const totalBox = Math.ceil(totalCalc / unitMultiplier)

  const handleAddQty = () => {
    clearStates()
    setModal(false)
    setResult(false)

    dispatch({
      type: 'SET_QUANTITY',
      args: { quantity: totalBox },
    })
  }

  const ModalResult = () => {
    return (
      <>
        {result === true ?
          <Result>
            <ResultContent>
              <Close onClick={handleHideModal} />
              <Total>
                Total: <Strong>{totalCalc.toFixed(2)}m²</Strong>
              </Total>
              <QuantityMin>
                Quantidade mínima que você deverá adicionar ao carrinho é:
                <Strong>
                  {' '}
                  {totalCalc.toFixed(2)}m² (Totalizando {totalBox} caixas)
                </Strong>
              </QuantityMin>
              <Content>
                <SmashContent>
                  <Smash>
                    <InputSmash
                      type="radio"
                      id="teenPercent"
                      name="teenPercent"
                      value="teenPercent"
                      checked={smashs.percent === 'teenPercent'}
                      onChange={handleChangeCheckbox}
                    />
                    <SmashLabel>
                      Adicionar 10% de quebra em instalações na horizontal ou
                      vertical.
                    </SmashLabel>
                  </Smash>
                  <Smash>
                    <InputSmash
                      type="radio"
                      id="fifteenPercent"
                      name="fifteenPercent"
                      value="fifteenPercent"
                      checked={smashs.percent === 'fifteenPercent'}
                      onChange={handleChangeCheckbox}
                    />
                    <SmashLabel>
                      Adicionar 15% de quebra em instalações na diagonal.
                    </SmashLabel>
                  </Smash>
                </SmashContent>
                <Paragraph>
                  Observação: O calculo final é ajustado de acordo com a quantidade
                  contida na caixa.
                </Paragraph>
                <ResultButtons>
                  <Remake onClick={clearStates}>Refazer cálculo</Remake>
                  <SelectQuantity onClick={handleAddQty}>
                    Selecionar quantidade
                  </SelectQuantity>
                </ResultButtons>
              </Content>
            </ResultContent>
          </Result>
        : null}
      </>
    )
  }

  return (
    <>
      <Button onClick={handleShowModal}>
        <IconCalc />
        Calcule a metragem ideal
      </Button>

      {modal === true ?
        <Modal>
          <ModalContent>
            <Close onClick={handleHideModal} />
            <Option>
              <Text>Calcular</Text>
              <RadioGroup>
                <InputRadio
                  type="radio"
                  name="measures"
                  value="measures"
                  checked={radios === 'measures'}
                  onClick={handleChangeRadios}
                />
                <Label>Medidas</Label>
              </RadioGroup>
              <RadioGroup>
                <InputRadio
                  type="radio"
                  name="area"
                  value="area"
                  checked={radios === 'area'}
                  onClick={handleChangeRadios}
                />
                <Label>Área</Label>
              </RadioGroup>
            </Option>

            {radios === 'measures' ? <MeasuresContent sizes={sizes} handleChangeInputs={handleChangeInputs} handleClickCalc={handleClickCalc} /> : <AreaContent sizes={sizes} handleChangeInputs={handleChangeInputs} handleClickCalc={handleClickCalc} />}
          </ModalContent>
        </Modal>
      : null}

      <ModalResult />
    </>
  )
}

const IconCalc = styled.i`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  display: inline-block;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAiBJREFUSA2tVktSAjEQ7Ywo7BwXluzkBuoNcgPxBngDN6I7h52fhXgCvYF4AsMJxBuwRN3IEqsgvoeEysAgcTBVqaST7pf+JR0laNv6dD8SdaFEVUmv0qzYT8ibkdjGh7npKIKvSfSyCugi2aGMDgqRRMkPgzrumcuHRcx/WS/r85qIvSe2Kusza0X6b+YqDgWJ9UlcUut7Pv/QSp8ucWs7+gyusjbighI73XAMv41F2aiJjYzf6WYoe+/kiImYxuMD3GLoiAAaaNdgh/V3nlwN7ql4tBR8InQ+cUWHroI1z/SB1yqYdx2dywIKO3C4YR9WvLI7UH/MdcAs+EAGGj5HUOdbrgOKUjROc4J/mibBu/Pwki8GAKogwO2BfFUn4DIU24S2HaS78Q/KFeSsO+MC74NzHuwi+n1WOISes6Cs6wnMbblb6QIKsAr6Vgioz5OyAJdEI6cv3PvkwBlQZHpmGvpgWfM5C8iElIt9cOY4A5oFsGwtZYFjtnhDeEMzUtGxLB1HIk08KUcLLBC8lLBjrPk0z5eC+gzv5rpFetaCrs+EXLclKT7u6PojC1N6L4xKWYCC00UWNRhoitNFk5GatDHvkA5pUOoEfLvjA+CKafHomesEAW6WpJTSePaGLj9EJeRRqDwtpOAhpv9WMqk9rL+F4k+pos8fATaC3ZBlBTBwZ1TMPRZ9KO++LePir7GwybW8DVr3IYtvyyjha/AN3SfNfwefdxMAAAAASUVORK5CYII=');
`

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 5px;
  border: 0;
  color: #184077;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  height: 48px;
  justify-content: center;
  max-width: 375px;
  transition: background 0.3s linear;
  width: 100%;

  &:hover {
    color: #d61016;

    ${IconCalc} {
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAhhJREFUSA2llkFyGjEQRVsuvEg2kauMtyFLyCL4BhzBuYFzA9/AcAN8guQG9g2MT8B4YVjCHrtKbOJUxUH5f5geNMOAZwZVUS21pNdSd48aI2hPttk1Yq7RveD4kObFO7BGkIOvbhGZBD4+BLprL4ycN0RMnwuM+B9tt/jF/qFtapuXXsxPss3EnnkRv+y4hS0Lnllr/0jjW7h+JWZJl6huYpuO4KNEkU7ogn3yVRo44RH8vPnB72O4G6dOWwSdVQOptkwH1wdcBvzhkDe6B8DLqbUtHVMiBtVb4oqIrvotx/cmg2i0MJyrqtYNuHkDN11kyyN/Cg1lLQN5+Ef528MtXAjWfi0DcMsI/o5PTvgX5wifKzSUtWKA07YQ3AfALxK4IOBDI6uo7Z5HBxso+mY08CGc/dIuot/zm8uMtww82bM+3yfdTDDGY/h9proqMmNgak+ZDdf6PoXZAn1hGr5nLGNAF+PhsyGcOf4BAdX5KrLQADIi+UK3UrECezUU+fe9ME2R4/FLyZMHeV4BLtJxL3fckLvB2zxH8a9yfIsn/TYMfG7N3mHmBm3n5siiwTrQLEImzSbE5QGkaC8tmJzY0ysQPscFB65w+FBOdJ4BRkFJ4dTnv1Bdu0uy4MRzOPEdqxrL3K7FVfU8PZlkZ4o+bwL3lHZDkWFkYBeutZwD7xy89d+WuECL70F+oq5+80tWPOD7fJ/+A8Xe2ozS2+TaAAAAAElFTkSuQmCC');
    }
  }
`

const Strong = styled.strong`
  color: #184077;
  font-weight: 800;
`

const Modal = styled.form`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  &:focus {
    outline: none;
  }
`

const ModalContent = styled.form`
  width: 683px;
  height: auto;
  display: inline-block;
  vertical-align: middle;
  background-color: #fff;
  padding: 20px 50px 40px 50px;
  border-radius: 3px;
  text-align: right;

  @media (max-width: 767.98px) {
    width: 90%;
    height: auto;
    padding: 20px;
  }
`

const Close = styled.span`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: inline-block;
  text-align: right;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAflJREFUSA2tlTFWAkEQRFlNDPEE7A3EjHANjcQMI9YbcAPxBtxAiDQTTwAhmUtm5noDPAH+WmdgGBuEp/1evZ2p7qma6V2YpLYjer1emiTJ1XK5zChLQRMoClCSm5J7GQwGpUgrEouUMPwdyME+MaTo3jL6YYB4m+IHUAeHxILiW0zG4aLjcIJ4zvwRnIT8nmOt6bRarY/ZbFb4NasTuJ0/+8Qfn9f+JJWB6/krooe2Zds+1K5zvZMjV9HnaYnP4T9djfVQTjVxSKsv8sjtvqtJFHN20ITLgGUiLnM1lklX2jpBG1jRoKCJQEEyA6GJFy9UQ64BrGjLILMycHUwMUxi8YmrtWQyGaRWxnGWidrid75LXBKNhB0udxj41ILBhWtXzbXlN/FqrU6wT6x+L0GxxQXp76EMrC8gLNzoufFOwtp4PJdBGbPBfEMcXm2xXnywZGNYymC6Qa0nlrheuvXiVWvFVAZjKwP3vuNriU3KLRpj/180pKBrFBVwKZCgFQvIEjSN5IgN5jqBog+sY2rhNnFSVc4Sl1ZfBZUBTiXjHPxX5E6ztrpwuCTedFng0P6ji261J6+xMhChmwiTOcNLcOitprbchOLM1yfQROFOoh2cAqu/KotjBNFBfBYnqq8oJv2cX23KWC3LQArOgEKnLMEUjBHW2IwvLCzMvLL1q6YAAAAASUVORK5CYII=');
`

const Option = styled.form`
  display: flex;
  margin: 30px 0;
  align-items: center;

  @media (max-width: 767.98px) {
    display: block;
    text-align: left;
  }
`

const RadioGroup = styled.form`
  margin: 0 25px;

  @media (max-width: 767.98px) {
    margin: 15px 30px 0 0;
    display: inline-block;
  }
`

const Text = styled.span`
  color: #184077;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;

  @media (max-width: 767.98px) {
    display: block;
  }
`

const InputRadio = styled.input`
  margin-right: 5px;
`

const Label = styled.label``

const Result = styled.form`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`

const ResultContent = styled.form`
  width: 683px;
  height: auto;
  display: inline-block;
  vertical-align: middle;
  background-color: #fff;
  padding: 20px 50px 40px 50px;
  border-radius: 3px;
  text-align: right;

  @media (max-width: 767.98px) {
    width: 90%;
    height: auto;
    padding: 20px;
  }
`

const Total = styled.p`
  color: #2e2e2e;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;

  @media (max-width: 767.98px) {
    text-align: center;
  }
`

const QuantityMin = styled.p`
  color: #2e2e2e;
  font-size: 16px;
  text-align: left;
  font-weight: 600;
`

const Content = styled.form``

const SmashContent = styled.form`
  margin: 20px 0;
`

const Smash = styled.form`
  margin: 10px 0;
  display: flex;
  align-items: center;
`

const InputSmash = styled.input``

const SmashLabel = styled.label`
  color: #2e2e2e;
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
  text-align: left;
`

const Paragraph = styled.p`
  color: #707070;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
`

const ResultButtons = styled.form`
  display: flex;
  margin-top: 40px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767.98px) {
    display: block;
    margin-top: 15px;
    text-align: center;
  }
`

const Remake = styled.button`
  border: 0;
  height: 48px;
  color: #707070;
  font-size: 12px;
  cursor: pointer;
  font-weight: 800;
  text-transform: uppercase;
  background-color: transparent;

  @media (max-width: 767.98px) {
    margin-bottom: 15px;
  }
`

const SelectQuantity = styled.button`
  border: 0;
  height: 48px;
  width: 230px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
  background-color: #d61016;
  text-transform: uppercase;
`

export default ModalFloorCalculator
