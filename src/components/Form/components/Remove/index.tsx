import React from 'react';
import { FiX } from 'react-icons/fi';

import { Container } from './styles';

interface Props {
  onClick(): void;
}

const Remove: React.FC<Props> = ({ onClick }) => {
  return (
    <Container type="button" onClick={onClick} tabIndex={-1}>
      <FiX size={16} />
    </Container>
  );
};

export default Remove;
