import React, { useState, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import DatePickerComponent from 'react-date-picker';
import { FiX, FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../../Tooltip';

import { Container, InputContainer, Remove } from './styles';

interface Props {
  name: string;
  label?: string;
}

const DatePicker: React.FC<Props> = ({ name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [date, setDate] = useState<Date | Date[] | null>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => date,
      clearValue: () => {
        setDate(null);
        setIsFilled(false);
      },
      setValue: (ref, value) => {
        setDate(value);
        setIsFilled(true);
      },
    });
  }, [fieldName, registerField, date]);

  const handleClearInput = useCallback(() => {
    setDate(null);
    setIsFilled(false);
  }, []);

  return (
    <Container isErrored={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <DatePickerComponent
          value={date}
          onChange={(value) => {
            setDate(value);
            setIsFilled(true);
          }}
          clearIcon={null}
          calendarIcon={null}
          onCalendarOpen={() => setIsFocused(true)}
          onCalendarClose={() => setIsFocused(false)}
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

export default DatePicker;
