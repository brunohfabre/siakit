import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { toPattern } from 'vanilla-masker';

import masks from '../../../utils/masks';

type Mask = keyof typeof masks;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask: Mask;
  label?: string;
}

const InputMask: React.FC<Props> = ({ name, mask, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const masked = useCallback(
    (data) => {
      const value = toPattern(data, masks[mask]);

      if (inputRef.current) {
        inputRef.current.value = value;
      }
    },
    [mask],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
      setValue: (ref, value) => {
        masked(value);
      },
    });
  }, [fieldName, registerField, masked]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        onChange={(e) => masked(e.target.value)}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
};

export default InputMask;
