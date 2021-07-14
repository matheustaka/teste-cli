import React, { useState } from 'react'
import styled from 'styled-components'

const Calculator: StorefrontFunctionComponent = () => {
  const [btu, setBtu] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [radios, setRadios] = useState('first-input')
  const [quantityPeople, setQuantityPeople] = useState(1)
  const [quantityElectronic, setquantityElectronic] = useState(1)
  const [sucess, setSucess] = useState(false)

  const [values, setValues] = useState({
    width: '',
    size: '',
    meters: '',
  })

  const [state, setState] = useState({
    period: '',
  }) as any

  const handleChangeInputs = (evt) => {
    const { value } = evt.target

    setValues({
      ...values,
      [evt.target.name]: value,
    })
  }

  const handleChangeRadios = (evt) => {
    const { value } = evt.target

    radios !== 'first-input'
      ? setValues({
          width: values.width,
          size: values.size,
          meters: '',
        })
      : null

    radios !== 'secundary-input'
      ? setValues({
          width: '',
          size: '',
          meters: values.meters,
        })
      : null

    setRadios(value)
  }

  const handleChangeCheckbox = (evt) => {
    setState({
      period: evt.target.value
    })
  }

  const handleIncrementPeople = () => {
    setQuantityPeople((currentPeople) => currentPeople + 1)
  }

  const handleDecrementPeople = () => {
    quantityPeople > 1
      ? setQuantityPeople((currentPeople) => currentPeople - 1)
      : quantityPeople
  }

  const handleIncrement = () => {
    setquantityElectronic((currentPeople) => currentPeople + 1)
  }

  const handleDecrement = () => {
    quantityElectronic > 1
      ? setquantityElectronic((currentPeople) => currentPeople - 1)
      : quantityElectronic
  }

  // calculo
  const handleCalculate = () => {
    if (
      (radios === 'first-input' && values.size === '') ||
      (radios === 'secundary-input' && values.meters === '')
    ) {
      setSucess(true)
    } else {
      setSucess(false)
    }

    const newValuePerPerson = 600
    const valuePerElectronic = 600
    const valuePerPerson = state.period === 'evening' ? 800 : 600

    const qtyPeople = quantityPeople === 1 ? newValuePerPerson : valuePerPerson + ((quantityPeople - 2) * newValuePerPerson)
    const qtyElectronic = quantityElectronic * valuePerElectronic
    const area =
      values.width !== '' && values.size !== ''
        ? Number(values.width) * Number(values.size)
        : Number(values.meters)

    const qty = area * qtyPeople
    const result = [qty + qtyElectronic] as any

    setBtu(result)
    setShowResult(true)
  }

  const clearStates = () => {
    setBtu(0)
    setShowResult(false)
    setQuantityPeople(1)
    setquantityElectronic(1)

    setValues({
      width: '',
      size: '',
      meters: '',
    })

    setState({
      morning: '',
      evening: '',
    })
  }

  const ContentCalc = () => {
    return (
      <Result>
        <ResultGrid>
          <ResultMsg>
            <strong>Concluído!</strong>
            A potência necessária para <br />
            climatizar seu ambiente é:
          </ResultMsg>
          <ResultCalc>{btu} BTUs</ResultCalc>
        </ResultGrid>
        <ResultAlert>
          Cálculo aproximado, com base nas informações apresentadas. <br />
          <strong>
            Em caso de dúvidas, contate nossa equipe especializada:{' '}
            <span>4001-1515</span>
          </strong>
        </ResultAlert>
        <Recalculate onClick={clearStates}>calcular novamente</Recalculate>
      </Result>
    )
  }

  const Error = () => {
    return (
      <Result>
        <Message>
          Favor preencher os campos necessários na{' '}
          <strong>Área do ambiente</strong>.
        </Message>
      </Result>
    )
  }

  return (
    <>
      <Container>
        <Grid>
          <Content>
            <Paragraph>Área do ambiente</Paragraph>
            <InputArea>
              <InputRadio
                type="radio"
                value="first-input"
                name="first-input"
                checked={radios === 'first-input'}
                onChange={handleChangeRadios}
              />
              <Input
                type="text"
                name="width"
                placeholder="Largura (m)"
                value={values.width}
                onChange={handleChangeInputs}
                disabled={radios === 'secundary-input'}
              />
              <Input
                type="text"
                name="size"
                placeholder="Comprimento (m)"
                value={values.size}
                onChange={handleChangeInputs}
                disabled={radios === 'secundary-input'}
              />
            </InputArea>
            <InputArea>
              <InputRadio
                type="radio"
                value="secundary-input"
                name="secundary-input"
                checked={radios === 'secundary-input'}
                onChange={handleChangeRadios}
              />
              <Input
                type="text"
                name="meters"
                placeholder="9 (m²)"
                value={values.meters}
                onChange={handleChangeInputs}
                disabled={radios === 'first-input'}
              />
            </InputArea>
          </Content>
          <Content>
            <AreaQuantity>
              <Paragraph>Número de pessoas no ambiente</Paragraph>
              <BoxQuantity>
                <Less className="less" onClick={handleDecrementPeople}>
                  -
                </Less>
                <InputQuantity
                  type="text"
                  name="quantity"
                  value={quantityPeople}
                />
                <More className="more" onClick={handleIncrementPeople}>
                  +
                </More>
              </BoxQuantity>
            </AreaQuantity>
            <AreaQuantity>
              <Paragraph>Número de aparelhos eletrônicos</Paragraph>
              <BoxQuantity>
                <Less onClick={handleDecrement}>-</Less>
                <InputQuantity
                  type="text"
                  name="quantity"
                  value={quantityElectronic}
                />
                <More onClick={handleIncrement}>+</More>
              </BoxQuantity>
            </AreaQuantity>
          </Content>
          <Content>
            <Paragraph>Qual período o ambiente recebe luz solar?</Paragraph>
            <InputAreaPeriod>
              <Period>
                <InputRadio
                  type="radio"
                  id="morning"
                  name="morning"
                  value="morning"
                  checked={state.period === 'morning'}
                  onChange={handleChangeCheckbox}
                />
                <Label>Manhã</Label>
              </Period>
              <Period>
                <InputRadio
                  type="radio"
                  id="evening"
                  name="evening"
                  value="evening"
                  checked={state.period === 'evening'}
                  onChange={handleChangeCheckbox}
                />
                <Label>Tarde</Label>
              </Period>
            </InputAreaPeriod>
          </Content>
        </Grid>
        <BoxButton>
          <ButtonCalculator onClick={handleCalculate}>
            Calcular btu
          </ButtonCalculator>
        </BoxButton>
      </Container>

      {sucess ? <Error /> : null}

      {showResult && sucess !== true ? <ContentCalc /> : null}
    </>
  )
}

const Container = styled.div`
  margin: 20px auto;
  max-width: 1040px;
  padding: 10px 30px;
  border-radius: 3px;
  box-shadow: 0 3px 11px rgba(0, 0, 0, 0.3);

  @media (max-width: 767.98px) {
    max-width: 100%;
    margin: 20px;
    padding: 10px;
  }
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 767.98px) {
    display: block;
  }
`

const Content = styled.div``

const Paragraph = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: #184077;
`

const InputArea = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  height: 48px;
  margin: 10px;
  color: #707070;
  font-size: 12px;
  padding-left: 10px;
  border-radius: 3px;
  border: 2px solid #e9e9e9;

  &:focus {
    outline: none;
  }
`

const InputRadio = styled.input`
  margin: 10px;
  border-radius: 3px;
  border: 2px solid #e9e9e9;

  &:focus {
    outline: none;
  }
`

const Label = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: #707070;
`

const AreaQuantity = styled.div`
  @media (max-width: 767.98px) {
    margin: 30px 0;
  }
`

const BoxQuantity = styled.div`
  height: 48px;
  width: 145px;
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  border: 2px solid #e9e9e9;
`

const Less = styled.span`
  color: #2e2e2e;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 10px;
`

const More = styled.span`
  color: #2e2e2e;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 10px;
`

const InputQuantity = styled.input`
  border: 0;
  width: 70px;
  height: 100%;
  text-align: center;

  &:focus {
    outline: none;
  }
`

const InputAreaPeriod = styled.div`
  display: block;
`

const Period = styled.div`
  display: flex;
  align-items: center;
`

const BoxButton = styled.div`
  text-align: center;
`

const ButtonCalculator = styled.button`
  border: 0;
  color: #fff;
  height: 48px;
  font-size: 12px;
  font-weight: 600;
  width: 436px;
  cursor: pointer;
  margin: 40px auto;
  border-radius: 5px;
  background-color: #184077;
  text-transform: uppercase;

  @media (max-width: 767.98px) {
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`

const Result = styled.div`
  margin: 50px auto;
  max-width: 1040px;
  text-align: center;

  @media (max-width: 767.98px) {
    max-width: 100%;
    margin: 20px;
  }
`

const ResultGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 767.98px) {
    display: block;
  }
`

const ResultMsg = styled.p`
  font-size: 14px;
  color: #707070;
  line-height: 21px;
  text-align: left;
  font-weight: 400;
  margin: 0 80px;

  strong {
    display: block;
    color: #184077;
    font-size: 16px;
    font-weight: 600;
  }

  @media (max-width: 767.98px) {
    margin: 0 0 30px 0;
    text-align: center;
  }
`

const ResultCalc = styled.p`
  color: #184077;
  font-size: 44px;
  font-weight: 600;
  line-height: 21px;
  margin: 0 80px;

  @media (max-width: 767.98px) {
    margin: 0;
  }
`

const ResultAlert = styled.div`
  margin: 30px 0;
  color: #707070;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  text-align: center;
`

const Recalculate = styled.button`
  border: 0;
  height: 48px;
  width: 244px;
  margin: 0 auto;
  color: #184077;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  border-radius: 5px;
  background-color: #eeeeee;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }
`

const Message = styled.p`
  font-size: 14px;
  text-align: center;
`

export default Calculator
