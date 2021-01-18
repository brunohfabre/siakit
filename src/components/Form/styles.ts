import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isErrored: boolean;
  width: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.width};

  label {
    margin-bottom: 4px;
    color: #24292e;

    ${(props) =>
      props.isErrored &&
      css`
        color: #dc3545;
      `}
  }

  input,
  textarea {
    width: 100%;
  }
`;

export const Error = styled(Tooltip)`
  height: 16px;
  display: flex;
  margin-left: 4px;

  svg {
    color: #dc3545;
  }
`;
