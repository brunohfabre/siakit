import React, { useState, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import DateRangePickerComponent from '@wojtekmaj/react-daterange-picker';
import { FiX, FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../../Tooltip';

import { Container, InputContainer, Remove } from './styles';

interface Props {
  name: string;
  label?: string;
}

const DateRangePicker: React.FC<Props> = ({ name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [dates, setDates] = useState<Date | Date[] | null>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => dates,
      clearValue: () => setDates([]),
      setValue: (ref, value) => {
        setDates(value);
      },
    });
  }, [fieldName, registerField, dates]);

  const handleClearInput = useCallback(() => {
    setDates(null);
    setIsFilled(false);
  }, []);

  return (
    <Container isErrored={!!error}>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <DateRangePickerComponent
          value={dates}
          onChange={(value: Date[]) => {
            setDates(value);
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

export default DateRangePicker;
