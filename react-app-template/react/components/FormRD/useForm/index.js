import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({}),
    [loading, setLoading] = useState(false),


    // Guardar o estado das alterações dos inputs
    handleChange = event => {
      const auxValues = { ...values };

      let target = event.target
      // Estrutura os novos valores e valida se o input é um checkbox
      auxValues[target.name] =  target.type === 'checkbox' ? target.checked : target.value;
      // Define os novos valores de values com uma variavel auxiliar
      setValues(auxValues);
    },

    handleSubmit = callback => event => {
      event.preventDefault();
      setLoading(true);
      callback();
      setLoading(false);

    };

  return [{ values, loading }, handleChange, handleSubmit];
};

export default useForm;
