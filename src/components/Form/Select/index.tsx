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
import { FiAlertCircle, FiChevronDown } from 'react-icons/fi';

import Spin from '../../Spin';

import Remove from '../components/Remove';

import { Container, Error } from '../styles';
import {
  Options,
  Option,
  TextSelected,
  InputContainer,
  SelectFocusInfo,
} from './styles';

interface Option {
  value: string;
  label: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  width?: string;
  options: Option[];
  onSearch?(value: string): void;
  loading?: boolean;
  next?(): void;
}

const Select: React.FC<Props> = ({
  name,
  label,
  width = 'initial',
  options,
  onChange,
  onSearch,
  loading = false,
  next,
  placeholder,
}) => {
  const initialRef = useRef(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState('');

  const [selected, setSelected] = useState<Option | null>(null);
  const [value, setValue] = useState('');
  const [data, setData] = useState<Option[]>(options);
  const [prevDataLength, setPrevDataLength] = useState(0);
  const [valueToSet, setValueToSet] = useState<Option | null>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleSelectOption = useCallback(
    (option) => {
      setIsFocused(false);
      setIsFilled(option.value);
      setSelected(option);
      setData(options);

      setValueToSet(null);

      if (onChange) {
        onChange(option);
      }

      if (inputRef.current) {
        inputRef.current.value = '';
        setValue('');
      }
    },
    [onChange, options],
  );

  useEffect(() => {
    if (options) {
      if (valueToSet) {
        setData([valueToSet, ...options]);
      } else {
        setData(options);
      }
    }
  }, [options, valueToSet]);

  useEffect(() => {
    if (initialRef.current) {
      if (defaultValue) {
        if (typeof defaultValue === 'object') {
          handleSelectOption(defaultValue);

          const findOption = data.find(
            (item) => item.value === defaultValue.value,
          );

          if (!findOption) {
            setValueToSet(defaultValue);

            setData((state) => [defaultValue, ...state]);
          }
        } else {
          const findOption = data.find((item) => item.value === defaultValue);

          if (findOption) {
            handleSelectOption(findOption);
          }
        }
      }

      initialRef.current = false;
    }
  }, [defaultValue, data, handleSelectOption]);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selected,
      clearValue: () => {
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

            const findOption = data.find(
              (item) => item.value === inputValue.value,
            );

            if (!findOption) {
              setValueToSet(inputValue);

              setData((state) => [inputValue, ...state]);
            }
          } else {
            const findOption = data.find((item) => item.value === inputValue);

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
      } else if (valueToSet) {
        setData(
          [valueToSet, ...options].filter((option) =>
            option.label.toLowerCase().includes(e.target.value.toLowerCase()),
          ),
        );
      } else {
        setData(
          options.filter((option) =>
            option.label.toLowerCase().includes(e.target.value.toLowerCase()),
          ),
        );
      }
    },
    [onSearch, options, debounced, valueToSet],
  );

  const handleClearInput = useCallback(() => {
    setIsFocused(false);
    setSelected(null);
    setValue('');
    setIsFilled('');
    setValueToSet(null);
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

      if (next) {
        next();
      }
    }
  }

  const handleClickOutside = useCallback(() => {
    setIsFocused(false);
    setIsFilled('');
    setValue('');

    if (valueToSet) {
      setData([valueToSet, ...options]);
    } else {
      setData(options);
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [valueToSet, options]);

  return (
    <Tippy
      interactive
      placement="bottom-start"
      visible={isFocused}
      onClickOutside={handleClickOutside}
      render={() => (
        <Spin padding={16} spinning={loading}>
          <Options onScroll={handleScroll}>
            {data.map((option) => (
              <Option
                key={option.value}
                onClick={() => handleSelectOption(option)}
                role="button"
                tabIndex={0}
                onKeyPress={undefined}
                isSelected={selected?.value === option.value}
              >
                {option.label}
              </Option>
            ))}
          </Options>
        </Spin>
      )}
    >
      <Container isErrored={!!error} width={width}>
        {label && <label htmlFor={fieldName}>{label}</label>}

        <InputContainer isFocused={isFocused} isErrored={!!error}>
          {!value && <TextSelected>{selected?.label}</TextSelected>}

          <input
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            type="text"
            onChange={handleInputChange}
            placeholder={selected || isFilled ? '' : placeholder}
          />
          {(selected || isFilled) && <Remove onClick={handleClearInput} />}

          {error && (
            <Error content={error}>
              <FiAlertCircle color="#dc3545" size={16} />
            </Error>
          )}

          <SelectFocusInfo onClick={() => setIsFocused(true)} type="button">
            <FiChevronDown size={20} color="#666" />
          </SelectFocusInfo>
        </InputContainer>
      </Container>
    </Tippy>
  );
};

export default Select;
