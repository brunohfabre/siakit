import React, { useEffect, InputHTMLAttributes, useState } from 'react';
import { useField } from '@unform/core';

import { Content } from './styles';

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
    <>
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

      {error && <span>{error}</span>}
    </>
  );
};

export default Switch;
