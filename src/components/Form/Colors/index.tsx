import React, { useEffect, InputHTMLAttributes, useState } from 'react';
import { useField } from '@unform/core';
import { CirclePicker } from 'react-color';

import { Container } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<Props> = ({ name, label }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [color, setColor] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => color,
      clearValue: () => setColor(''),
      setValue: (ref, value) => setColor(value),
    });
  }, [fieldName, registerField, color]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <CirclePicker onChange={(value) => setColor(value.hex)} color={color} />

      {error && <span>{error}</span>}
    </Container>
  );
};

export default Input;
