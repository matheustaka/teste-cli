import React, { useState, useEffect, useCallback, render } from 'react';
import './global.css'
import useForm from './useForm';

const FormSA = _ => {
    const [{ values, loading }, handleChange, handleSubmit] = useForm(),
        [disabled, setDisabled] = useState(""),
        [dialog, setDialog] = useState(false);

    const enviarContato = () => {
        fetch("/api/dataentities/SA/documents", {
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

    return <div className="autorizada-form-content" id="form">
        <div className="autorizada-form-center">
            <form className="form-content" className={`form-content ${disabled == "disabled" && "disabled"}`} onSubmit={handleSubmit(enviarContato)}>
                <div className="form-content-input">
                    <label>Nome da Empresa *</label>
                    <input type="text" onChange={handleChange} id="nomedaempresa" name="nomedaempresa" required="required" placeholder="Nome da Empresa" />
                </div>
                <div className="form-content-input">
                    <label>Endereço da Empresa *</label>
                    <input type="text" onChange={handleChange} id="enderecodaempresa" name="enderecodaempresa" required="required" placeholder="Endereço da Empresa" />
                </div>
                <div className="form-content-input">
                    <label>Cidade da Sede *</label>
                    <input type="text" onChange={handleChange} id="cidadedasede" name="cidadedasede" required="required" placeholder="Cidade da Sede" />
                </div>
                <div className="form-content-input">
                    <label>UF da Empresa *</label>
                    <select onChange={handleChange} name="ufdaempresa" id="ufdaempresa" aria-required="true" aria-invalid="false">
                        <option onChange={handleChange} value="">---</option>
                        <option onChange={handleChange} value="Acre">Acre</option>
                        <option onChange={handleChange} value="Alagoas">Alagoas</option>
                        <option onChange={handleChange} value="Amazonas">Amazonas</option>
                        <option onChange={handleChange} value="Amapá">Amapá</option>
                        <option onChange={handleChange} value="Bahia">Bahia</option>
                        <option onChange={handleChange} value="Ceará">Ceará</option>
                        <option onChange={handleChange} value="Distrito Federal">Distrito Federal</option>
                        <option onChange={handleChange} value="Espírito Santo">Espírito Santo</option>
                        <option onChange={handleChange} value="Goiás">Goiás</option>
                        <option onChange={handleChange} value="Maranhão">Maranhão</option>
                        <option onChange={handleChange} value="Mato Grosso">Mato Grosso</option>
                        <option onChange={handleChange} value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                        <option onChange={handleChange} value="Minas Gerais">Minas Gerais</option>
                        <option onChange={handleChange} value="Pará">Pará</option>
                        <option onChange={handleChange} value="Paraíba">Paraíba</option>
                        <option onChange={handleChange} value="Paraná">Paraná</option>
                        <option onChange={handleChange} value="Pernambuco">Pernambuco</option>
                        <option onChange={handleChange} value="Piauí">Piauí</option>
                        <option onChange={handleChange} value="Rio de Janeiro">Rio de Janeiro</option>
                        <option onChange={handleChange} value="Rio Grande do Norte">Rio Grande do Norte</option>
                        <option onChange={handleChange} value="Rondônia">Rondônia</option>
                        <option onChange={handleChange} value="Rio Grande do Sul">Rio Grande do Sul</option>
                        <option onChange={handleChange} value="Roraima">Roraima</option>
                        <option onChange={handleChange} value="Santa Catarina">Santa Catarina</option>
                        <option onChange={handleChange} value="Sergipe">Sergipe</option>
                        <option onChange={handleChange} value="São Paulo">São Paulo</option>
                        <option onChange={handleChange} value="Tocantins">Tocantins</option>
                    </select>
                </div>
                <div className="form-content-input">
                    <label>RAZÃO SOCIAL *</label>
                    <input type="text" onChange={handleChange} id="razaosocial" name="razaosocial" required="required" placeholder="RAZÃO SOCIAL" />
                </div>
                <div className="form-content-input">
                    <label>CEP</label>
                    <input type="text" onChange={handleChange} id="cep" name="cep" required="required" placeholder="CEP" />
                </div>
                <div className="form-content-input">
                    <label>CNPJ *</label>
                    <input type="text" onChange={handleChange} id="cnpj" name="cnpj" required="required" placeholder="CNPJ" />
                </div>
                <div className="form-content-input">
                    <label>Inscrição Estadual *</label>
                    <input type="text" onChange={handleChange} id="inscricaoestadual" name="inscricaoestadual" required="required" placeholder="Inscrição Estadual" />
                </div>
                <div className="form-content-input left">
                    <label>Inscrição Municipal *</label>
                    <input type="text" onChange={handleChange} id="inscricaomunicipal" name="inscricaomunicipal" required="required" placeholder="Inscrição Municipal" />
                </div>
                <div className="form-content-input">
                    <label>Site da Empresa *</label>
                    <input type="text" onChange={handleChange} id="sitedaempresa" name="sitedaempresa" required="required" placeholder="Site da Empresa" />
                </div>
                <div className="form-content-input">
                    <label>Ramo de Atuação (Pessoa Juridica) *</label>
                    <input type="text" onChange={handleChange} id="ramodeatuacao" name="ramodeatuacao" required="required" placeholder="Ramo de Atuação (Pessoa Juridica)" />
                </div>
                <div className="form-content-input left">
                    <label>Nome do dono da empresa/ titular *</label>
                    <input type="text" onChange={handleChange} id="donodaempresa" name="donodaempresa" required="required" placeholder="Nome do dono da empresa/ titular" />
                </div>
                <div className="form-content-input">
                    <label>TELEFONES (OPÇÃO 1) COM DDD E NÚMERO *</label>
                    <input type="text" onChange={handleChange} id="telefone1" name="telefone1" required="required" placeholder="TELEFONES (OPÇÃO 1) COM DDD E NÚMERO" />
                </div>
                <div className="form-content-input">
                    <label>TELEFONES (OPÇÃO 2) COM DDD E NÚMERO</label>
                    <input type="text" onChange={handleChange} id="telefone2" name="telefone2" required="required" placeholder="TELEFONES (OPÇÃO 2) COM DDD E NÚMERO" />
                </div>
                <div className="form-content-input left">
                    <label>Já é Autorizada de alguma Marca?</label>
                    <label>
                        <input value="sim" name="autorizadadealgumamarca" id="autorizadadealgumamarca" onChange={handleChange} type="radio" />
                        <span>Sim</span>
                    </label>
                    <label>
                        <input value="nao" name="autorizadadealgumamarca" id="autorizadadealgumamarca" onChange={handleChange} type="radio" />
                        <span>Não</span>
                    </label>
                </div>
                <div className="form-content-input">
                    <label>Marca Autorizada *</label>
                    <input type="text" onChange={handleChange} id="marcaautorizada" name="marcaautorizada" required="required" placeholder="Marca Autorizada *" />
                </div>
                <div className="form-content-input">
                    <label>Tempo de Empresa</label>
                    <input type="text" onChange={handleChange} id="tempodeempresa" name="tempodeempresa" required="required" placeholder="Tempo de Empresa" />
                </div>
                <div className="form-content-input">
                    <label>Nº de Funcionários *</label>
                    <input type="text" onChange={handleChange} id="numerodefuncionarios" name="numerodefuncionarios" required="required" placeholder="Nº de Funcionários" />
                </div>
                <div className="form-content-input">
                    <label>Nº de Técnicos *</label>
                    <input type="text" onChange={handleChange} id="numerodetecnicos" name="numerodetecnicos" required="required" placeholder="Nº de Técnicos" />
                </div>
                <div className="form-content-input left">
                    <label>Qual cidade atende atualmente? *</label>
                    <input type="text" onChange={handleChange} id="cidadesqueatende" name="cidadesqueatende" required="required" placeholder="Qual cidade atende atualmente?" />
                </div>
                <div className="form-content-input">
                    <label>Disponibilidade para atuação em outra Região do Brasil ?</label>
                    <input type="text" onChange={handleChange} id="disponibilidadederegioes" name="disponibilidadederegioes" required="required" placeholder="Disponibilidade para atuação em outra Região do Brasil ?" />
                </div>



                {dialog && <span>{dialog}</span>}
                <button>{loading ? 'Loading...' : `${disabled == "disabled" ? "Enviado!" : "Enviar"}`}</button>
            </form>
        </div>
    </div>;
}

export default FormSA;