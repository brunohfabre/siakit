import React from 'react';

import { Container, Content } from './styles';

interface Props {
  color?: 'light' | 'dark';
}

const Spin: React.FC<Props> = ({ color = 'dark', children }) => {
  if (children) {
    return (
      <>
        <Container isFloating={!!children}>
          <Content color={color} />
        </Container>

        {children}
      </>
    );
  }

  return (
    <Container>
      <Content color={color} />
    </Container>
  );
};

export default Spin;
