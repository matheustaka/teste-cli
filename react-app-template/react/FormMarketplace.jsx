import React from 'react';
import styled from "styled-components";


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content:center;
`

export const Name = styled.input`
    width: 300px;
    background-color: #f7f7f7;
    border: 1px solid #dddddd;
    border-radius: 15px;
`

const Label = styled.label`
    font-size: 1rem;
    color: #1a1a1a;
`
const FormMarketplace = () => {

    return (
        <>

            <Form >
                <Label htmlFor='name'>Nome</Label>
                <Name type="name" name='name'/>

            </Form>
        </>
    )
}

export default FormMarketplace