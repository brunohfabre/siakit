import styled from 'styled-components';

export const Card = styled.div`
  max-width: 320px;
  background: tomato;
  border-radius: 4px;

  p {
    padding: 16px;
    cursor: pointer;

    &:hover {
      background: gray;
    }
  }
`;
