import React, { useState, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import DateRangePickerComponent from '@wojtekmaj/react-daterange-picker';
import { FiAlertCircle } from 'react-icons/fi';

import Remove from '../components/Remove';

import { Container, Error } from '../styles';
import { InputContainer } from './styles';

interface Props {
  name: string;
  label?: string;
  width?: string;
}

const DateRangePicker: React.FC<Props> = ({
  name,
  label,
  width = 'initial',
  ...rest
}) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState<Date | Date[] | null>(defaultValue);

  const [dates, setDates] = useState<Date | Date[] | null>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => dates,
      clearValue: () => {
        setIsFilled(null);
        setDates(null);
      },
      setValue: (ref, value) => {
        setDates(value);
      },
    });
  }, [fieldName, registerField, dates]);

  const handleClearInput = useCallback(() => {
    setDates(null);
    setIsFilled(null);
  }, []);

  return (
    <Container isErrored={!!error} width={width}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <DateRangePickerComponent
          value={dates}
          onChange={(value: Date[]) => {
            setDates(value);
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

export default DateRangePicker;
