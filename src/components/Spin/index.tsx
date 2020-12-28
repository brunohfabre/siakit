import React from 'react';

import { Container, Content } from './styles';

interface Props {
  color?: 'light' | 'dark';
  padding?: number;
  spinning?: boolean;
}

const Spin: React.FC<Props> = ({
  color = 'dark',
  children,
  padding,
  spinning = true,
}) => {
  if (children) {
    return (
      <>
        {spinning && (
          <Container isFloating={!!children}>
            <Content color={color} />
          </Container>
        )}

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
