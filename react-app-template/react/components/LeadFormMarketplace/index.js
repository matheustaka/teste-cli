import React, { useState, useEffect, useCallback, render } from 'react';
import './global.css'
import useForm from './useForm';

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
      })
      .catch(err => {
        console.error(err);
      });

    console.log(values);
  };

  return <div className="marketplace-form-content" id="form">
    <div className="marketplace-form-center">
      <form className="form-content" className={`form-content ${disabled == "disabled" && "disabled"}`} onSubmit={handleSubmit(enviarContato)}>
        <div className="form-content-input">
          <label htmlFor='name'>Nome</label>
          <input type="text" onChange={handleChange} id="name" name="name" required="required" placeholder="Nome" />
        </div>
        <div className="form-content-input">
          <label htmlFor='fantasy-name'>Nome Fantasia</label>
          <input type="text" onChange={handleChange} id="fantasy-name" name="fantasy-name" placeholder="Nome Fantasia" />
          <label htmlFor='company-name'>Razão Social</label>
          <input  type="text" onChange={handleChange} id="company-name" name="company-name" placeholder="Razão Social" />
        </div>

        <div className="form-content-input">
          <label htmlFor='cnpj'>CNPJ</label>
          <input type="text" onChange={handleChange} id="cnpj" name="cnpj" required="required" placeholder="CNPJ" />

          <label htmlFor='phone'>Telefone</label>
          <input type="text" onChange={handleChange} id="phone" name="phone" required="required" placeholder="Telefone" />
        </div>


        <div className="form-content-input">
          <label htmlFor='cep'>CEP</label>
          <input type="text" onChange={handleChange} id="cep" name="cep" required="required" placeholder="cep" />

          <label htmlFor='address'>Endereço</label>
          <input type="text" onChange={handleChange} id="address" name="address" required="required" placeholder="Endereço" />
        </div>

        <div className="form-content-input">
          <label htmlFor='complement'>Complemento</label>
          <input type="text" onChange={handleChange} id="complement" name="complement" required="required" placeholder="Complemento" />
          <label htmlFor='city'>Cidade</label>
          <input type="text" onChange={handleChange} id="city" name="city" required="required" placeholder="Cidade" />
        </div>


        <div className="form-content-input">
          <label htmlFor='email'>E-mail</label>
          <input type="email" onChange={handleChange} id="email" name="email" required="required" placeholder="E-mail" />
        </div>

        {dialog && <span>{dialog}</span>}
        <button>{loading ? 'Loading...' : `${disabled == "disabled" ? "Enviado!" : "Enviar"}`}</button>
      </form>
    </div>
  </div>;
}

export default LeadFormMarketplace;
