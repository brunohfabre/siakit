import styled, { css } from 'styled-components';

interface InputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

// TODO: width fixo em 146px no container

export const InputContainer = styled.div<InputContainerProps>`
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

    > div:nth-child(1) {
    cursor: text;
    flex: 1;
    margin: 0 !important;
    background: transparent !important;

    .react-date-picker__wrapper {
      border: 0;
    }
  }
`;
