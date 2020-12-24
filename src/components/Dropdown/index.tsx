import React, { useCallback, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import { Content } from './styles';

interface Option {
  id: string;
  label: string;
}

interface Props {
  isClickable?: boolean;
  options: Option[];
  placement?:
    | 'top'
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'
    | undefined;
  onSelect(option: Option): void;
}

const Dropdown: React.FC<Props> = ({
  children,
  isClickable = false,
  options,
  placement = 'bottom-start',
  onSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectOption = useCallback(
    (option) => {
      onSelect(option);

      setIsVisible(false);
    },
    [onSelect],
  );

  return (
    <Tippy
      interactive
      placement={placement}
      visible={isClickable ? isVisible : undefined}
      onClickOutside={() => (isClickable ? setIsVisible(false) : undefined)}
      render={() => (
        <Content>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </button>
          ))}
        </Content>
      )}
    >
      <span
        onClick={() => (isClickable ? setIsVisible(!isVisible) : undefined)}
        role="button"
        tabIndex={0}
        onKeyPress={() => undefined}
      >
        {children}
      </span>
    </Tippy>
  );
};

export default Dropdown;
