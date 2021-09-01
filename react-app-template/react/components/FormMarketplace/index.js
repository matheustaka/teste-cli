import React, { useState, useEffect, useCallback, render } from 'react';
import './global.css'
import useForm from './useForm';

const FormMarketplace = _ => {
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
            <p className="marketplace-form-title">Quer saber mais?</p>
            <p className="marketplace-form-description">Faça o seu pré-cadastro que enviaremos todos os detalhes e vantagens de fazer parte do <strong>Marketplace Cassol</strong> </p>
           <form className="form-content" className={`form-content ${disabled == "disabled" && "disabled"}`} onSubmit={handleSubmit(enviarContato)}>
                <div className="form-content-input">
                    <label>Nome:</label>
                    <input type="text" onChange={handleChange} id="name" name="name" required="required" placeholder="Nome" />
                </div>
                <div className="form-content-input">
                    <label>Cargo:</label>
                    <input type="text" onChange={handleChange} id="cargo" name="cargo" required="required" placeholder="Cargo" />
                </div>
                <div className="form-content-input">
                    <label>Nome da empresa:</label>
                    <input type="text" onChange={handleChange} id="nomedaempresa" name="nomedaempresa" required="required" placeholder="Nome da empresa" />
                </div>
                <div className="form-content-input left">
                    <label>CNPJ:</label>
                    <input type="text" onChange={handleChange} id="cnpj" name="cnpj" required="required" placeholder="CNPJ" />
                </div>
                <div className="form-content-input left">
                    <label>Telefone:</label>
                    <input type="text" onChange={handleChange} id="telefone" name="telefone" required="required" placeholder="Telefone" />
                </div>
                <div className="form-content-input">
                    <label>E-mail:</label>
                    <input type="email" onChange={handleChange} id="email" name="email" required="required" placeholder="E-mail" />
                </div>
        
                {dialog && <span>{dialog}</span>}
                <button>{loading ? 'Loading...' : `${disabled == "disabled" ? "Enviado!" : "Enviar"}`}</button>
            </form>
        </div>
    </div>;
}

export default FormMarketplace;