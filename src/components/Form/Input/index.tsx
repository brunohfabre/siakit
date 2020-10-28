import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { FiX } from 'react-icons/fi';

import { Container, InputContainer, Remove } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<Props> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState('');

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
      clearValue: () => setIsFilled(''),
    });
  }, [fieldName, registerField]);

  const handleClearInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setIsFilled('');
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
          onChange={(e) => setIsFilled(e.target.value)}
          {...rest}
        />

        {isFilled && (
          <Remove type="button" onClick={handleClearInput}>
            <FiX size={16} />
          </Remove>
        )}

        {/* {error && <span>{error}</span>} */}
      </InputContainer>
    </Container>
  );
};

export default Input;
