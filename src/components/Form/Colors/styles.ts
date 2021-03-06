import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
  width: string;
}

export const Container = styled.div<ContainerProps>`
  max-width: ${(props) => props.width};

  label {
    ${(props) =>
      props.isErrored &&
      css`
        color: #dc3545;
      `}
  }
`;

export const PickerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;

  > div:first-child {
    width: auto !important;

    display: flex;
  }
`;
