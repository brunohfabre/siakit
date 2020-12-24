import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;

    ${(props) =>
      props.isErrored &&
      css`
        color: #dc3545;
      `}

    & + label {
      margin-left: 16px;
    }

    input {
      margin-right: 4px;
    }
  }

  > div {
    height: 16px;
    margin-left: 8px;
  }
`;
