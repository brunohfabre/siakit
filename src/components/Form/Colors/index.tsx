import React, { useEffect, InputHTMLAttributes, useState } from 'react';
import { useField } from '@unform/core';
import { CirclePicker } from 'react-color';
import { FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../../Tooltip';

import { Container, PickerContainer } from './styles';

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
    <Container isErrored={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <PickerContainer>
        <CirclePicker onChange={(value) => setColor(value.hex)} color={color} />

        {error && (
          <Tooltip content={error}>
            <FiAlertCircle color="#dc3545" size={16} />
          </Tooltip>
        )}
      </PickerContainer>
    </Container>
  );
};

export default Input;
