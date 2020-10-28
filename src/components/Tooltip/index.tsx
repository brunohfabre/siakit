import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Tooltip: React.FC<TippyProps> = ({ children, ...rest }) => {
  return (
    <Tippy {...rest}>
      <div>{children}</div>
    </Tippy>
  );
};

export default Tooltip;
