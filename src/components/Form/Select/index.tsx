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

  const [selected, setSelected] = useState<Option | null>(null);
  const [value, setValue] = useState('');
  const [data, setData] = useState<Option[]>(options);
  const [prevDataLength, setPrevDataLength] = useState(0);
  const [valueToSet, setValueToSet] = useState<Option | null>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if (options) {
      if (valueToSet) {
        setData([valueToSet, ...options]);
      } else {
        setData(options);
      }
    }
  }, [options]);

  const handleSelectOption = useCallback(
    (option) => {
      setIsFocused(false);
      setIsFilled(option.id);
      setSelected(option);

      setValueToSet(null);

      if (onChange) {
        onChange(option);
      }

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
              setValueToSet(inputValue);

              setData((state) => [inputValue, ...state]);
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
          <List onScroll={handleScroll}>
            {data.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option)}
                role="button"
                tabIndex={0}
                onKeyPress={undefined}
                // isSelected={selected?.id === option.id}
              >
                {option.label}
              </div>
            ))}
          </List>
        </Spin>
      )}
    >
      <Container isErrored={!!error}>
        {label && <label htmlFor={fieldName}>{label}</label>}

        <InputContainer isFocused={isFocused} isErrored={!!error}>
          {!value && <TextSelected>{selected?.label}</TextSelected>}

          <input
            ref={inputRef}
            onFocus={() => {
              setIsFocused(true);
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
