import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import Remove from '../components/Remove';

import { Container, Error } from '../styles';
import { InputContainer } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  width?: string;
}

const Input: React.FC<Props> = ({
  name,
  label,
  width = 'initial',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
      clearValue: (ref) => {
        ref.value = '';
        setIsFilled('');
      },
    });
  }, [fieldName, registerField]);

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
          defaultValue={defaultValue}
          onChange={(e) => setIsFilled(e.target.value)}
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

export default Input;
