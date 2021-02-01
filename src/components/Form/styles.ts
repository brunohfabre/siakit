import styled, { css } from 'styled-components';
import { Form as Unform } from '@unform/web';

import Tooltip from '../Tooltip';

export const Form = styled(Unform)`
  section {
    display: flex;

    & + section {
      margin-top: 8px;
    }

    > div {
      flex: 1;

      & + div {
        margin-left: 8px;
      }
    }
  }
`;

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
