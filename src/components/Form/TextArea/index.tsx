import React, {
  useEffect,
  useRef,
  TextareaHTMLAttributes,
  useState,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import Remove from '../components/Remove';

import { Container, Error } from '../styles';
import { TextAreaContainer } from './styles';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  width?: string;
  rows?: number;
}

const TextArea: React.FC<Props> = ({
  name,
  label,
  width = 'initial',
  rows = 3,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const handleClearTextArea = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setIsFilled('');
    }
  }, []);

  return (
    <Container isErrored={!!error} width={width}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <TextAreaContainer isFocused={isFocused} isErrored={!!error}>
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={(e) => setIsFilled(e.target.value)}
          rows={rows}
          {...rest}
        />

        <span>
          {isFilled && <Remove onClick={handleClearTextArea} />}

          {error && (
            <Error content={error}>
              <FiAlertCircle color="#dc3545" size={16} />
            </Error>
          )}
        </span>
      </TextAreaContainer>
    </Container>
  );
};

export default TextArea;
