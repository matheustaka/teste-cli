import React, { useState, useEffect, useCallback, render } from 'react';
import './global.css'
import useForm from './useForm';

import ModalSubmitted from './ModalSubmitted';

const LeadFormMarketplace = _ => {
  const [{ values, loading }, handleChange, handleSubmit] = useForm(),
    [disabled, setDisabled] = useState(""),
    [dialog, setDialog] = useState(false);

  const enviarContato = () => {
    fetch("/api/dataentities/MP/documents", {
      "method": "POST",
      "headers": {
        "Accept": "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        setDisabled("disabled")
        setSubmitted(true)
      })
      .catch(err => {
        console.error(err);
      });

    console.log(values);
  };

  return (
    <>
      {

        submitted ?
          <>

            <ModalSubmitted />
            <div className="marketplace-form-content" id="form">
              <div className="marketplace-form-center">
                <form className="form-content" className={`form-content`} onSubmit={handleSubmit(enviarContato)}>
                  <div className="form-content-input">
                    <label htmlFor='name'>Nome</label>
                    <input type="text" onChange={handleChange} id="name" name="name" required="required" placeholder="Nome" />
                  </div>
                  <div className="form-content-input">
                    <label htmlFor='nomefantasia'>Nome Fantasia</label>
                    <input type="text" onChange={handleChange} id="nomefantasia" name="nomefantasia" placeholder="Nome Fantasia" />
                    <label htmlFor='razaosocial'>Razão Social</label>
                    <input type="text" onChange={handleChange} id="razaosocial" name="razaosocial" placeholder="Razão Social" />
                  </div>

                  <div className="form-content-input">
                    <label htmlFor='cnpj'>CNPJ</label>
                    <input type="text" onChange={handleChange} id="cnpj" name="cnpj" required="required" placeholder="CNPJ" />

                    <label htmlFor='telefone'>Telefone</label>
                    <input type="text" onChange={handleChange} id="telefone" name="telefone" required="required" placeholder="Telefone" />
                  </div>


                  <div className="form-content-input">
                    <label htmlFor='cep'>CEP</label>
                    <input type="text" onChange={handleChange} id="cep" name="cep" required="required" placeholder="cep" />

                    <label htmlFor='endereco'>Endereço</label>
                    <input type="text" onChange={handleChange} id="endereco" name="endereco" required="required" placeholder="Endereço" />
                  </div>

                  <div className="form-content-input">
                    <label htmlFor='complement'>Complemento</label>
                    <input type="text" onChange={handleChange} id="complement" name="complement" required="required" placeholder="Complemento" />
                    <label htmlFor='cidade'>Cidade</label>
                    <input type="text" onChange={handleChange} id="cidade" name="cidade" required="required" placeholder="Cidade" />
                  </div>


                  <div className="form-content-input">
                    <label htmlFor='email'>E-mail</label>
                    <input type="email" onChange={handleChange} id="email" name="email" required="required" placeholder="E-mail" />
                  </div>

                  {dialog && <span>{dialog}</span>}
                  <button>{loading ? 'Loading...' : `${disabled == "disabled" ? "Enviado!" : "Enviar"}`}</button>
                </form>
              </div>
            </div>
          </>
          :
          <div className="marketplace-form-content" id="form">
            <div className="marketplace-form-center">
              <form className="form-content" className={`form-content ${disabled == "disabled" && "disabled"}`} onSubmit={handleSubmit(enviarContato)}>
                <div className="form-content-input">
                  <label htmlFor='name'>Nome</label>
                  <input type="text" onChange={handleChange} id="name" name="name" required="required" placeholder="Nome" />
                </div>
                <div className="form-content-input">
                  <label htmlFor='nomefantasia'>Nome Fantasia</label>
                  <input type="text" onChange={handleChange} id="nomefantasia" name="nomefantasia" placeholder="Nome Fantasia" />
                  <label htmlFor='razaosocial'>Razão Social</label>
                  <input type="text" onChange={handleChange} id="razaosocial" name="razaosocial" placeholder="Razão Social" />
                </div>

                <div className="form-content-input">
                  <label htmlFor='cnpj'>CNPJ</label>
                  <input type="text" onChange={handleChange} id="cnpj" name="cnpj" required="required" placeholder="CNPJ" />

                  <label htmlFor='telefone'>Telefone</label>
                  <input type="text" onChange={handleChange} id="telefone" name="telefone" required="required" placeholder="Telefone" />
                </div>


                <div className="form-content-input">
                  <label htmlFor='cep'>CEP</label>
                  <input type="text" onChange={handleChange} id="cep" name="cep" required="required" placeholder="cep" />

                  <label htmlFor='endereco'>Endereço</label>
                  <input type="text" onChange={handleChange} id="endereco" name="endereco" required="required" placeholder="Endereço" />
                </div>

                <div className="form-content-input">
                  <label htmlFor='complement'>Complemento</label>
                  <input type="text" onChange={handleChange} id="complement" name="complement" required="required" placeholder="Complemento" />
                  <label htmlFor='cidade'>Cidade</label>
                  <input type="text" onChange={handleChange} id="cidade" name="cidade" required="required" placeholder="Cidade" />
                </div>


                <div className="form-content-input">
                  <label htmlFor='email'>E-mail</label>
                  <input type="email" onChange={handleChange} id="email" name="email" required="required" placeholder="E-mail" />
                </div>

                {dialog && <span>{dialog}</span>}
                <button>{loading ? 'Loading...' : `${disabled == "disabled" ? "Enviado!" : "Enviar"}`}</button>
              </form>
            </div>
          </div>

      }
    </>
  )



}

export default LeadFormMarketplace;
