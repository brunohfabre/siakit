import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { toPattern } from 'vanilla-masker';
import { FiAlertCircle } from 'react-icons/fi';

import masks from '../../../utils/masks';

import Remove from '../components/Remove';

import { Container, Error } from '../styles';
import { InputContainer } from './styles';

type Mask = keyof typeof masks;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask: Mask;
  label?: string;
  width?: string;
}

const InputMask: React.FC<Props> = ({
  name,
  mask,
  label,
  width = 'initial',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(
    toPattern(defaultValue, masks[mask]),
  );

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
        setIsFilled(String(value));
        masked(value);
      },
      clearValue: (ref) => {
        ref.value = '';
        setIsFilled('');
      },
    });
  }, [fieldName, registerField, masked]);

  const handleClearInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setIsFilled('');
    }
  }, []);

  return (
    <Container isErrored={!!error} width={width}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id={fieldName}
          ref={inputRef}
          defaultValue={toPattern(defaultValue, masks[mask])}
          onChange={(e) => {
            masked(e.target.value);
            setIsFilled(e.target.value);
          }}
          {...rest}
        />

        {isFilled && <Remove onClick={handleClearInput} />}

        {error && (
          <Error content={error}>
            <FiAlertCircle color="#dc3545" size={16} />
          </Error>
        )}
      </InputContainer>
    </Container>
  );
};

export default InputMask;
