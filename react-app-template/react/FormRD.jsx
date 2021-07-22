import React from 'react'
import styled from 'styled-components';


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
const EmailInput = styled.input`
    display: inline-block;
    padding: 0 1rem;
    

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

const FormWrapper = styled.form`
    display:flex;
    width: 100%;
    height:inherit;
    color: #fff
`

const Submit = styled.button`
    background-color:#d61016;
    border: none; 
    color:#fff;
    font-family: Montserrat,sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0;
    vertical-align: middle;

    display:inline-block;
`

const FormRD = () => {

    const closeForm = () => {
        let newsRow = document.querySelector('.vtex-flex-layout-0-x-flexRow--newsletterRow');
        newsRow.style.display = 'none'
    };
    return (
        <>
            < FormWrapper name="newsletterForm">
                < CloseButton onClick={closeForm}></ CloseButton>
                < Label htmlFor="communications" className='newsLabel' />
                < Input type="checkbox" data-privacy="true" name="communications" value="1" required />
                Eu concordo em receber comunicações e ofertas.
                <Input type="hidden" data-privacy="true" name="privacy_policy" value="1" />

                <EmailInput type="email" name="email" placeholder="Digite seu melhor e-mail"></EmailInput>
                <Submit type="submit" value="Cadastrar">Cadastrar</Submit>
            </ FormWrapper>

        </>
    )
}


export default FormRD