import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({}),
    [loading, setLoading] = useState(false),
    handleChange = event => {
      const auxValues = { ...values };
      auxValues[event.target.name] = event.target.value;
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