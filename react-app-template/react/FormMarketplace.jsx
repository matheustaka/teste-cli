import React from 'react';

import styled from "styled-components";


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content:center;
`

export const Name = styled.input`
    border-radius: 50%;
    width: 300px;
`
const FormMarketplace = () => {

    return (
        <>

            <Form >

                <Name type="name" />

            </Form>
        </>
    )
}

export default FormMarketplace