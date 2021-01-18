import styled, { css } from 'styled-components';
import { shade } from 'polished';

import Card from '../../Card';

export const Options = styled(Card)`
  min-width: 200px;
  max-height: 360px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

interface OptionProps {
  isSelected: boolean;
}

export const Option = styled.div<OptionProps>`
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  color: #24292e;
  background: #fff;

  &:hover {
    background: ${shade(0.05, '#fff')};
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: #237bc3;
      color: #fff;

      &:hover {
        background: ${shade(0.05, '#237bc3')};
      }
    `}
`;

export const TextSelected = styled.div`
  position: absolute;
  left: 12px;
`;

interface InputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  background: #fff;
  height: 32px;
  padding: 0 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  transition: border 0.2s;
  transition: border-color 0.2s;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border: 1px solid #dc3545;
      background: #fff5f6;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border: 1px solid #237bc3;
      background: #fff;
    `}

  input {
    flex: 1;
    border: 0;
    color: #24292e;
    background: transparent;
    margin-left: 4px;
    z-index: 5;
    cursor: pointer;

    &::placeholder {
      color: rgba(0, 0, 0, 0.16);
    }
  }
`;

export const SelectFocusInfo = styled.button`
  background: transparent;
  border: 0;
  height: 20px;
  margin-left: 4px;
`;
