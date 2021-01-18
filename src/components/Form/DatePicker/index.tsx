import React, { useState, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import DatePickerComponent from 'react-date-picker';
import { FiAlertCircle } from 'react-icons/fi';

import Remove from '../components/Remove';

import { Container, Error } from '../styles';
import { InputContainer } from './styles';

interface Props {
  name: string;
  label?: string;
  width?: string;
}

const DatePicker: React.FC<Props> = ({
  name,
  label,
  width = 'initial',
  ...rest
}) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState<Date | Date[] | null>(defaultValue);

  const [date, setDate] = useState<Date | Date[] | null>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => date,
      clearValue: () => {
        setDate(null);
        setIsFilled(null);
      },
      setValue: (ref, value) => {
        setDate(value);
        setIsFilled(value);
      },
    });
  }, [fieldName, registerField, date]);

  const handleClearInput = useCallback(() => {
    setDate(null);
    setIsFilled(null);
  }, []);

  return (
    <Container isErrored={!!error} width={width}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <DatePickerComponent
          value={date}
          onChange={(value) => {
            setDate(value);
            setIsFilled(value);
          }}
          clearIcon={null}
          calendarIcon={null}
          onCalendarOpen={() => setIsFocused(true)}
          onCalendarClose={() => setIsFocused(false)}
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

export default DatePicker;
