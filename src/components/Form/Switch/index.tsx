import React, { useEffect, InputHTMLAttributes, useState } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Error } from '../styles';
import { Container, Content } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Switch: React.FC<Props> = ({ name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [value, setValue] = useState(() => defaultValue || false);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      clearValue: () => setValue(false),
      setValue: (ref, data) => setValue(data),
    });
  }, [fieldName, registerField, value]);

  return (
    <Container isErrored={!!error}>
      <label
        htmlFor={fieldName}
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr',
          gridGap: 8,
          alignItems: 'center',
        }}
      >
        <Content htmlFor={fieldName}>
          <input
            defaultChecked={defaultValue}
            checked={value}
            onChange={(e) => setValue(e.target.checked)}
            id={fieldName}
            type="checkbox"
            {...rest}
          />

          <span />
        </Content>
        {label}
      </label>

      {error && (
        <Error content={error}>
          <FiAlertCircle color="#dc3545" size={16} />
        </Error>
      )}
    </Container>
  );
};

export default Switch;
