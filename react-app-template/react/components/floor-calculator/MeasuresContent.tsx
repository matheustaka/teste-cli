import React from 'react'
import styled from 'styled-components'

export interface Default {
  sizes: any;
  handleChangeInputs: any;
  handleClickCalc: any;
}

const MeasuresContent: StorefrontFunctionComponent<Default> = ({sizes, handleChangeInputs, handleClickCalc}) => {
  return (
    <BoxContainer>
      <BoxContent>
        <BoxInputGroup>
          <LabelBox>Comprimento</LabelBox>
          <BoxInput
            type="text"
            name="length"
            placeholder="Exemplo: 5"
            onChange={handleChangeInputs}
            value={sizes.length}
          />
        </BoxInputGroup>
        <BoxInputGroup>
          <LabelBox>Largura</LabelBox>
          <BoxInput
            type="text"
            name="width"
            placeholder="Exemplo: 3.5"
            onChange={handleChangeInputs}
            value={sizes.width}
          />
        </BoxInputGroup>
        <BoxButton onClick={handleClickCalc}>Calcular</BoxButton>
      </BoxContent>
    </BoxContainer>
  )
}

const BoxContainer = styled.div``

const BoxContent = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: 767.98px) {
    display: flex;
    flex-wrap: wrap;
  }
`

const LabelBox = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`

const BoxInputGroup = styled.div`
  margin-right: 15px;

  @media (max-width: 767.98px) {
    margin-right: 0;
    flex: 1;

    &:first-child {
      margin-right: 15px;
    }
  }
`

const BoxInput = styled.input`
  height: 48px;
  width: 200px;
  font-size: 12px;
  margin-top: 15px;
  padding-left: 5px;
  border-radius: 3px;
  border: 2px solid #e9e9e9;

  @media (max-width: 767.98px) {
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`

const BoxButton = styled.button`
  height: 48px;
  border: 0;
  width: 150px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  border-radius: 3px;
  background-color: #184077;
  text-transform: uppercase;

  @media (max-width: 767.98px) {
    flex: 1 100%;
    margin-top: 30px;
  }
`

export default MeasuresContent
