import { useState } from 'react';

export default (initialVal = '') => {
  const [state, setValue] = useState(initialVal);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [state, handleChange, reset];
};
