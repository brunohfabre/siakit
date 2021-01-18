import styled from 'styled-components';

export const Container = styled.button`
  border: 0;
  background: transparent;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  svg {
    color: rgba(0, 0, 0, 0.32);
  }
`;
