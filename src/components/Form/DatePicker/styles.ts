import styled, { css } from 'styled-components';

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
  width: 146px;

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
  background: #fff;
  height: 32px;
  padding: 0 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  transition: border 0.2s;

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

  > div {
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
