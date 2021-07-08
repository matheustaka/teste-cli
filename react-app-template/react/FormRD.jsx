import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
const CSS_HANDLES = ['labelsContainer'] 
const FormRD = () => {

    const handles = useCssHandles();
    return (
        <>
            <div className={`${handles.container}`}>

                <label>

                    <input type="hidden" data-privacy="true" name="privacy_policy" value="1" />

                    Ao informar meus dados, eu concordo com a <a href="/privacidade" target="_blank">Política de Privacidade</a>.

                </label>

                <label>

                    <input type="checkbox" data-privacy="true" name="communications" value="1" required />

                    Eu concordo em receber comunicações e ofertas personalizadas de acordo com meus interesses.

                </label>

            </div>
        </>
    )
}


export default FormRD