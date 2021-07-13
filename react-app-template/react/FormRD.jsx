import React from 'react'
import styled from 'styled-components'
const CSS_HANDLES = ['labelsContainer'] 

const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    max-width: 395px;
`

const Label = styled.label`
    font-size: .8rem;
`
const Checkbox= styled.input`
    margin: 0 10px;
`
const FormRD = () => {

    return (
        <>
            <Div>
                <Label>

                    <input type="checkbox" data-privacy="true" name="communications" value="1" required />

                    Eu concordo em receber comunicações e ofertas personalizadas de acordo com meus interesses.

                </Label>
                <Label>

                    <input type="hidden" data-privacy="true" name="privacy_policy" value="1" />

                    Ao informar meus dados, eu concordo com a <a href="/privacidade" target="_blank">Política de Privacidade</a>.

                </Label>


            </Div>
        </>
    )
}


export default FormRD