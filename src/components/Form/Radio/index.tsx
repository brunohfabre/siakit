import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Error } from '../styles';
import { Container } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Radio: React.FC<Props> = ({ name, label, options, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs.filter((ref: HTMLInputElement) => ref.checked)[0]?.value;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach((ref) => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container isErrored={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <div>
        {options.map((option, index) => (
          <label htmlFor={option.value} key={option.value}>
            <input
              defaultChecked={defaultValue === option.value}
              ref={(ref) => {
                inputRefs.current[index] = ref as HTMLInputElement;
              }}
              value={option.value}
              type="radio"
              id={option.value}
              name={name}
              {...rest}
            />

            {option.label}
          </label>
        ))}

        {error && (
          <Error content={error}>
            <FiAlertCircle color="#dc3545" size={16} />
          </Error>
        )}
      </div>
    </Container>
  );
};

export default Radio;
