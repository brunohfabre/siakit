import styled from 'styled-components';

import Card from '../Card';

export const Content = styled(Card)`
  max-width: 320px;
  border-radius: 4px;

  p {
    padding: 16px;
    cursor: pointer;

    &:hover {
      background: gray;
    }
  }
`;
