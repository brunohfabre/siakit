import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  > label {
    margin-bottom: 4px;
    color: #24292e;

    ${(props) =>
      props.isErrored &&
      css`
        color: #dc3545;
      `}
  }

  > div {
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

      input {
        margin-right: 4px;
      }

      & + label {
        margin-left: 16px;
      }
    }
  }
`;
