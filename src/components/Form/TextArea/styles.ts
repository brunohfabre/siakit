import styled, { css } from 'styled-components';

interface TextAreaContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const TextAreaContainer = styled.div<TextAreaContainerProps>`
  background: #fff;
  padding-left: 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: border 0.2s;
  transition: border-color 0.2s;
  transition: background-color 0.2s;
  position: relative;

  display: flex;

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

  textarea {
    flex: 1;
    border: 0;
    color: #24292e;
    background: transparent;
    margin-left: 4px;
    resize: vertical;
    min-height: 32px;
    padding: 6px 0;
    padding-right: 56px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.16);
    }
  }

  span {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    margin-top: 6px;
    height: 20px;
  }
`;
