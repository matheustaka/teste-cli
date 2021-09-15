import React, { useState } from 'react'
import styled from 'styled-components'
import useForm from './useForm'
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
const FormRD = () => {

  const enviarContato = () => {
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
        setDisabled('disabled')
      })
      .catch((err) => {
        console.error(err)
      })

    fetch(`https://api.rd.services/platform/conversions?api_key=${API_KEY}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: {
        event_type: 'CONVERSION',
        payload: {
          conversion_identifier: 'newsletter-form',
          legal_bases: [
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
      console.log(response)
    })
  }

  const closeForm = () => {
    let newsRow = document.querySelector('.vtex-flex-layout-0-x-flexRow--newsletterRow');
    newsRow.style.display = 'none'
  };

  const [{ values }, handleChange, handleSubmit] = useForm()

  return (
    <>
      <Div>
        <form id="form-rd" onSubmit={handleSubmit(enviarContato)}>
          <div>
            {/* <div>Receba as melhores ofertas Cassol!</div> */}
            <Input onChange={handleChange} type="checkbox" data-privacy="true" id="agreeWithTerms" name="agreeWithTerms" value="1" required />
            <Label htmlFor="agreeWithTerms">
              Li e aceito os termos de uso e <Link href='https://www.cassol.com.br/privacidade'> política de privacidade</Link> da Cassol.
            </Label>
            <Input type="hidden" data-privacy="true" id="privacy_policy" name="privacy_policy" value="1" />

          </div>
          {/* <div>
            <EmailField type="email" placeholder="Digite seu melhor e-mail" id="email" name="email" onChange={handleChange} />

            <SubmitField type="submit" value="Inscrever-se" />
          </div> */}



        </form>



        <CloseButton onClick={closeForm}></CloseButton>

      </Div>
    </>
  )
}


export default FormRD
