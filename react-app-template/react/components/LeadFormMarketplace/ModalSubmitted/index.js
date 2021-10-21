import React, { useState } from "react";
import '../global.css'
const ModalSubmitted = () => {

  const [show, setShow] = useState(true)
  const [handleClose, setClose] = useState(false);
  return (


    <>
      <article className={`modalSubmittedContainer ${show ? '' : 'hidden'}`} >

        <div className='modalSubmittedContent'>

          <div className='modalSubmittedCard'>

            <div className='cardTitle'>
              <img src='/arquivos/formSubmitted.png' alt='Formulário enviado' title='Formulário enviado' />
              <h1 className='submittedTitle'>Cadastro enviado com sucesso!</h1>
            </div>

            <div className='cardMessage'>
              <h3>Agradecemos a participação :) </h3>
              <p>Entraremos em contato por e-mail</p>
            </div>
            <div className='modalSubmittedClose' onClick={() => { setShow(!show) }}>X</div>
          </div>

        </ div>

      </article>
      :
      <>
      </>

    </>
  )
}
export default ModalSubmitted;
