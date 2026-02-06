import type { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ children, className, ...rest }: BoxProps) => {
  return (
    <div className={cn('box', className)} {...rest}>
      {children}
    </div>
  );
};

Box.displayName = 'Box';

export { Box };
