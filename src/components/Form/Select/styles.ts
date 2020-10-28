import styled from 'styled-components';

export const Container = styled.div`
  min-width: 200px;
  max-height: 300px;
  overflow-y: auto;
  background: blue;
  display: flex;
  flex-direction: column;
`;

export const TextSelected = styled.div`
  position: absolute;
  margin: 2px;
`;
