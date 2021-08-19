import React, {useState} from 'react'
import styled from 'styled-components'
import useForm from './useForm'
const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
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
const FormRD = () => {

  const [{ values, loading }, handleChange, handleSubmit] = useForm()
  const [disabled, setDisabled] = useState('')
  const [dialog, setDialog] = useState(false)

  const enviarContato = () => {
    fetch('/api/dataentities/FL/documents', {
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

    console.log(values)
  }



  const closeForm = () => {
    let newsRow = document.querySelector('.vtex-flex-layout-0-x-flexRow--newsletterRow');
    newsRow.style.display = 'none'
  };
  return (
    <>
      <Div>


        <form onSubmit={handleSubmit(enviarContato)} id="form-rd">
          <Input type="checkbox" data-privacy="true" name="communications" value="1" required />

          Li e aceito os termos de uso e <Link href='https://www.cassol.com.br/privacidade'> política de privacidade</Link> da Cassol.
          <Input type="hidden" data-privacy="true" name="privacy_policy" value="1" />

          <EmailField onChange={handleChange} type="email" placeholder="Digite seu melhor e-mail" />
          <button>
            {loading
              ? 'Loading...'
              : `${disabled == 'disabled' ? 'Enviado!' : 'Enviar'}`}
          </button>
        </form>



        <CloseButton onClick={closeForm}></CloseButton>

      </Div>
    </>
  )
}


export default FormRD
