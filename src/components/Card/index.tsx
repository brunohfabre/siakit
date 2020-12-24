import React, { HTMLAttributes, forwardRef } from 'react';

import { Container } from './styles';

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card: React.ForwardRefRenderFunction<HTMLDivElement, CardProps> = (
  { className, children, ...rest },
  ref,
) => {
  return (
    <Container ref={ref} className={className} {...rest}>
      {children}
    </Container>
  );
};

export default forwardRef(Card);
