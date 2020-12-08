import React, { useRef, useEffect, useCallback, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import debounce from 'lodash.debounce';
import { useField } from '@unform/core';
import { FiX, FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../../Tooltip';

import {
  List,
  TextSelected,
  Container,
  InputContainer,
  Remove,
} from './styles';

interface Option {
  id: string;
  label: string;
}

interface Props {
  name: string;
  label?: string;
  options: Option[];
  onChange(option: Option): void;
  onSearch?(value: string): void;
}

const Select: React.FC<Props> = ({
  name,
  label,
  options,
  onChange,
  onSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<Option | null>();
  const [value, setValue] = useState('');
  const [data, setData] = useState(options);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleSelectOption = useCallback(
    (option) => {
      setIsFilled(true);
      setSelected(option);

      onChange(option);

      setIsVisible(false);

      if (inputRef.current) {
        inputRef.current.value = '';
        setData(options);
        setValue('');
      }
    },
    [onChange, options],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selected,
      clearValue: () => {
        setIsVisible(false);
        setSelected(null);
        setValue('');
        setIsFilled(false);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      },
      setValue: (ref, inputValue) => {
        if (inputValue) {
          if (typeof inputValue === 'object') {
            handleSelectOption(inputValue);

            const findOption = data.find((item) => item.id === inputValue.id);

            if (!findOption) {
              setData([inputValue, ...data]);
            }
          } else {
            const findOption = data.find((item) => item.id === inputValue);

            if (findOption) {
              handleSelectOption(findOption);
            }
          }
        }
      },
    });
  }, [fieldName, registerField, selected, handleSelectOption, data]);

  const debounced = useCallback(
    debounce((e) => onSearch && onSearch(e.target.value), 350),
    [],
  );

  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);
      setIsFilled(true);

      if (onSearch) {
        debounced(e);
      } else {
        setData(
          options.filter((option) =>
            option.label.toLowerCase().includes(e.target.value.toLowerCase()),
          ),
        );
      }
    },
    [onSearch, options, debounced],
  );

  const handleClearInput = useCallback(() => {
    setIsVisible(false);
    setSelected(null);
    setValue('');
    setIsFilled(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  return (
    <Tippy
      interactive
      placement="bottom-start"
      visible={isVisible}
      onClickOutside={() => setIsVisible(false)}
      render={() => (
        <List>
          {data.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelectOption(option)}
              role="button"
              tabIndex={0}
              onKeyPress={undefined}
              style={
                selected?.id === option.id
                  ? { background: 'green' }
                  : { background: 'transparent' }
              }
            >
              {option.label}
            </div>
          ))}
        </List>
      )}
    >
      <Container isErrored={!!error}>
        {label && <label htmlFor={fieldName}>{label}</label>}

        <InputContainer isFocused={isFocused} isErrored={!!error}>
          {!value && <TextSelected>{selected?.label}</TextSelected>}
          <input
            ref={inputRef}
            onFocus={() => {
              setIsVisible(true);
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            type="text"
            onChange={handleInputChange}
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
    </Tippy>
  );
};

export default Select;
