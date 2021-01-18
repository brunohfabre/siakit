import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Tooltip: React.FC<TippyProps> = ({ children, className, ...rest }) => {
  return (
    <Tippy {...rest}>
      <div className={className}>{children}</div>
    </Tippy>
  );
};

export default Tooltip;
