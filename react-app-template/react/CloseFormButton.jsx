import React from 'react'
import styled from 'styled-components'

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
const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
`

const CloseFormButton = () => {

    const closeForm = () => {
        let newsRow = document.querySelector('.vtex-flex-layout-0-x-flexRow--newsletterRow');
        newsRow.style.display = 'none'
    };
    return (
        <>
            <Div>
                <CloseButton onClick={closeForm}></CloseButton>
            </Div>
        </>
    )
}


export default CloseFormButton