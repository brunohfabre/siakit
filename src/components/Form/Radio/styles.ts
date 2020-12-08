import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  label {
    display: flex;
    align-items: center;

    input {
      margin-right: 4px;
    }

    & + label {
      margin-left: 16px;
    }
  }
`;
