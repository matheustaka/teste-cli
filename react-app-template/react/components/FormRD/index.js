import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import useForm from './useForm'
import './global.css'

const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    width: 100%;
`

const Label = styled.label`
    font-size: .8rem;
    color:#fff;
`
const Input = styled.input`
    margin-right: 10px;
    color:#fff;
`

const Link = styled.a`
    color:#fff;
`

const CloseButton = styled.a`
    width: 30px;
    height: 30px;
    background-color: #d61016;
    right:0px;
    top:0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .25rem;
    position: absolute;

    &:hover{
        cursor: pointer;
    }
    &:after, &:before{
        content: "";
        width: 3px;
        height: 80%;
        transform: rotate(45deg);
        background-color: white;
        position: absolute;
    }
    &:before{
        transform: rotate(-45deg);
    }
`

const EmailField = styled.input`
  background-color: #fff;
  color: #3f3f40;
  padding: 0 1rem;
  outline: 0;
  font-family: Montserrat,sans-serif;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  border: none;
  border-radius: .25rem;
  height: 40px;
`

const SubmitField = styled.input`
  color: #fff;
  background-color: #d61016;
  text-transform: uppercase;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-weight: 500;
  min-height: 2.5rem;
  border: none;
  border-radius: .25rem;

  &:hover{
    cursor: pointer;
  }
`

const Arrow = styled.div`
  content: "";
  width: 50px;
  height: 100%;
  position: relative;
  padding: 10px;
  /* animation: example 2s linear 3s infinite normal; */

  &:hover{
    cursor: pointer;
  }

  &::before,  &::after {
  content: "";
  display: block;
  width: 35px;
  background-color: #fff;
  height: 10px;
  border-radius: 10px;
  position: absolute;
  }
  &::before {
    transform: rotate(30deg);
    left: 5px;
    top: 16px;
  }
  &::after {
    transform: rotate(-30deg);
    left: 5px;
    bottom: 18px;
  }

  @keyframes example {
  0% {
    left: 0;
    opacity: 1;
  }

  50% {
    left: 5px;
    opacity: 0.5;
  }

  100% {
    left: 10px;
    opacity: 0;
  }
}
`
const FormRD = () => {

  // Status de enviado para quando enviar o form
  const [enviado, setEnviado] = useState(false)
  const enviarContato = () => {

    setEnviado(true)
    let API_KEY = '016cf0ef1ac5e4cb720c13c45b136e7c'
    fetch('/api/dataentities/FR/documents', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        setDisabled('disabled');
        console.log('resposta MD', response);
      })
      .catch((err) => {
        console.error(err)
      })

    fetch(`https://api.rd.services/platform/conversions?api_key=${API_KEY}`, {
      "method": 'POST',
      "headers": {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      "body": {
        "event_type": 'CONVERSION',
        "payload": {
          "conversion_identifier": 'newsletter-form',
          "legal_bases": [
            {
              "category": "communications",
              "type": "consent",
              "status": "granted"
            }
          ],
          email: JSON.stringify(values)
        }
      }
    }).then((response) => {
      console.log('Resposta API', response)
    })
  }




  // Parameter is the boolean, with default "false" value
  const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the comopnent,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => setState(state => !state), []);

    return [state, toggle]
  }
  const [toggle, setToggle] = useToggle();

  const [{ values }, handleChange, handleSubmit] = useForm()




  return (
    <>
      <Div>
        <form id="form-rd" className="mainForm" onSubmit={handleSubmit(enviarContato)}>

          {enviado ?
            // Quando enviado, mostre
            <>
              <div>
                <h3 className="newsletter-title">Cadastro efetuado com sucesso! Muito Obrigado! </h3>
              </div>
            </>
            :
            <>
              <div className={`newsletter-ct ${toggle ? 'normal' : 'reduzido'}`}>
                <div className="newsletter-ct-main">
                  <h3 className="newsletter-title"> Cadastre-se em nossa newsletter! </h3>
                  <Arrow className="arrow" onClick={setToggle}></Arrow>

                </div>

                <div className={`form-content ${toggle ? 'ativo' : 'hidden'}`}>

                  <div className={`form-left`}>
                    <h3 className={`newsletter-title`}>Receba as melhores ofertas Cassol!</h3>
                    <Input onChange={handleChange} type="checkbox" data-privacy="true" id="agreeWithTerms" name="agreeWithTerms" value="1" required />
                    <Label htmlFor="agreeWithTerms">
                      Li e aceito os termos de uso e <Link href='https://www.cassol.com.br/privacidade'> política de privacidade</Link> da Cassol.
                    </Label>
                    <Input type="hidden" data-privacy="true" id="privacy_policy" name="privacy_policy" value="1" />

                  </div>

                  <div className={`mainForm`}>
                    <EmailField type="email" placeholder="Digite seu melhor e-mail" id="email" name="email" onChange={handleChange} />

                    <SubmitField type="submit" value="Inscrever-se" />
                  </div>

                </div>

              </div>

            </>

          }


        </form>



        {/* <CloseButton onClick={setToggle}> {toggle ? '' : ''}   </CloseButton> */}

      </Div>
    </>
  )
}


export default FormRD
