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
          <label>Nome</label>
          <input type="text" onChange={handleChange} id="name" name="name" required="required" placeholder="Nome" />
        </div>
        <div className="form-content-input">
          <label>Nome Fantasia</label>
          <input type="text" onChange={handleChange} id="fantasy-name" name="fantasy-name" required="required" placeholder="Nome Fantasia" />
          <label>Razão:</label>
          <input type="text" onChange={handleChange} id="fantasy-name" name="fantasy-name" required="required" placeholder="Razão Social" />
        </div>

        <div className="form-content-input">
          <label>CNPJ</label>
          <input type="text" onChange={handleChange} id="cnpj" name="cnpj" required="required" placeholder="CNPJ" />

          <label>Telefone</label>
          <input type="text" onChange={handleChange} id="telefone" name="telefone" required="required" placeholder="Telefone" />
        </div>


        <div className="form-content-input">
          <label>CEP</label>
          <input type="text" onChange={handleChange} id="cep" name="cep" required="required" placeholder="cep" />

          <label>Endereço</label>
          <input type="text" onChange={handleChange} id="address" name="address" required="required" placeholder="Endereço" />
        </div>

        <div className="form-content-input">
          <label>Complemento</label>
          <input type="text" onChange={handleChange} id="complement" name="complement" required="required" placeholder="Complemento" />
          <label>Cidade</label>
          <input type="text" onChange={handleChange} id="cidade" name="cidade" required="required" placeholder="Cidade" />
        </div>


        <div className="form-content-input">
          <label>E-mail</label>
          <input type="email" onChange={handleChange} id="email" name="email" required="required" placeholder="E-mail" />
        </div>

        {dialog && <span>{dialog}</span>}
        <button>{loading ? 'Loading...' : `${disabled == "disabled" ? "Enviado!" : "Enviar"}`}</button>
      </form>
    </div>
  </div>;
}

export default LeadFormMarketplace;
