import React, { useState, useEffect } from 'react';
import { useField } from '@unform/core';
import DateRangePickerComponent from '@wojtekmaj/react-daterange-picker';

interface Props {
  name: string;
  label?: string;
}

const DateRangePicker: React.FC<Props> = ({ name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

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

  return (
    <DateRangePickerComponent
      value={dates}
      onChange={(value: Date[]) => setDates(value)}
      {...rest}
    />
  );
};

export default DateRangePicker;
