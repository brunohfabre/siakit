import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  InputHTMLAttributes,
  SyntheticEvent,
} from 'react';
import Tippy from '@tippyjs/react/headless';
import debounce from 'lodash.debounce';
import { useField } from '@unform/core';
import { FiX, FiAlertCircle } from 'react-icons/fi';

import Tooltip from '../../Tooltip';
import Spin from '../../Spin';

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

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  options: Option[];
  onSearch?(value: string): void;
  loading: boolean;
  next?(): void;
}

const Select: React.FC<Props> = ({
  name,
  label,
  options,
  onChange,
  onSearch,
  loading = false,
  next,
  placeholder,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<Option | null>();
  const [value, setValue] = useState('');
  const [data, setData] = useState(options);
  const [prevDataLength, setPrevDataLength] = useState(0);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if (options) {
      setData(options);
    }
  }, [options]);

  const handleSelectOption = useCallback(
    (option) => {
      setIsFilled(option.id);
      setSelected(option);

      if (onChange) {
        onChange(option);
      }

      setIsVisible(false);

      if (inputRef.current) {
        inputRef.current.value = '';
        setValue('');
      }
    },
    [onChange],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selected,
      clearValue: () => {
        setIsVisible(false);
        setSelected(null);
        setValue('');
        setIsFilled('');
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
      setIsFilled(e.target.value);

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
    setIsFilled('');
    setData(options);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [options]);

  function handleScroll(event: SyntheticEvent): void {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (loading) {
      return;
    }

    if (prevDataLength === options.length) {
      return;
    }

    if (scrollHeight - scrollTop === clientHeight) {
      setPrevDataLength(options.length);

      console.log('load more');

      if (next) {
        next();
      }
    }
  }

  return (
    <Tippy
      interactive
      placement="bottom-start"
      visible={isVisible}
      onClickOutside={() => setIsVisible(false)}
      render={() => (
        <List onScroll={handleScroll}>
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

          {loading && <Spin padding={16} />}
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
            onBlur={() => {
              setIsFocused(false);
              setIsFilled('');
              setValue('');
              setData(options);
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
            type="text"
            onChange={handleInputChange}
            placeholder={selected || isFilled ? '' : placeholder}
          />
          {(selected || isFilled) && (
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
