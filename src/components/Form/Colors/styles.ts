import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
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

  > div:nth-child(2) {
    height: 16px;
    margin-left: 8px;
  }
`;
