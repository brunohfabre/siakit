import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { toPattern } from 'vanilla-masker';
import { FiX, FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../../Tooltip';

import masks from '../../../utils/masks';

import { Container, InputContainer, Remove } from './styles';

type Mask = keyof typeof masks;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask: Mask;
  label?: string;
}

const InputMask: React.FC<Props> = ({ name, mask, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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
        setIsFilled(true);
        masked(value);
      },
    });
  }, [fieldName, registerField, masked]);

  const handleClearInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setIsFilled(false);
    }
  }, []);

  return (
    <Container isErrored={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={(e) => {
            masked(e.target.value);
            setIsFilled(true);
          }}
          {...rest}
        />

        {isFilled && (
          <Remove type="button" onClick={handleClearInput}>
            <FiX size={16} />
          </Remove>
        )}

        {error && (
          <Tooltip content={error}>
            <FiAlertCircle color="#dc3545" size={16} />
          </Tooltip>
        )}
      </InputContainer>
    </Container>
  );
};

export default InputMask;
