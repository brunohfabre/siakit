import React, { useEffect, useState } from 'react';
import { useField } from '@unform/core';
import { ReactSliderProps } from 'react-slider';

import { StyledSlider, StyledThumb, StyledTrack } from './styles';

interface Props extends ReactSliderProps {
  name: string;
  label?: string;
}

const Slider: React.FC<Props> = ({ name, label, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      clearValue: () => setValue(0),
      setValue: (ref, data) => setValue(Number(data)),
    });
  }, [fieldName, registerField, value]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <StyledSlider
        renderTrack={(props, state) => (
          <StyledTrack {...props} index={state.index} />
        )}
        renderThumb={(props, state) => (
          <StyledThumb {...props}>{state.valueNow}</StyledThumb>
        )}
        onChange={(data) => setValue(data)}
        value={value}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
};

export default Slider;
