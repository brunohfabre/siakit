import styled, { css } from 'styled-components';

import Card from '../../Card';

export const List = styled(Card)`
  min-width: 200px;
  max-height: 140px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 8px 0;

  div {
    &:hover {
      cursor: pointer;
      background: blue !important;
    }
  }
`;

export const TextSelected = styled.div`
  position: absolute;
  left: 12px;
`;

interface ContainerProps {
  isErrored: boolean;
}

interface InputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 4px;
    color: #24292e;

    ${(props) =>
      props.isErrored &&
      css`
        color: #dc3545;
      `}
  }
`;

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

    &::placeholder {
      color: rgba(0, 0, 0, 0.16);
    }
  }

  > div:last-child {
    display: flex;
    margin-left: 8px;

    svg {
      color: #dc3545;
    }
  }
`;

export const Remove = styled.button`
  border: 0;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 20px;
  height: 20px;
  margin-left: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    color: rgba(0, 0, 0, 0.32);
  }
`;
