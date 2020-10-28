import React, { useState, useEffect } from 'react';
import { useField } from '@unform/core';
import DatePickerComponent from 'react-date-picker';

interface Props {
  name: string;
  label?: string;
}

const DatePicker: React.FC<Props> = ({ name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [date, setDate] = useState<Date | Date[] | null>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => date,
      clearValue: () => setDate(null),
      setValue: (ref, value) => {
        setDate(value);
      },
    });
  }, [fieldName, registerField, date]);

  return (
    <DatePickerComponent
      value={date}
      onChange={(value) => setDate(value)}
      {...rest}
    />
  );
};

export default DatePicker;
