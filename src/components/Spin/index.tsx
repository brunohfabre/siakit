import React from 'react';

import { Container, Content } from './styles';

interface Props {
  color?: 'light' | 'dark';
  padding?: number;
}

const Spin: React.FC<Props> = ({ color = 'dark', children, padding }) => {
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
    <Container style={{ padding }}>
      <Content color={color} />
    </Container>
  );
};

export default Spin;
