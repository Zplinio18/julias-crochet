import type { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface FlexProps {
  children: ReactNode;
  className?: string;
}

const Flex = ({ children, className = '', ...rest }: FlexProps) => {
  return (
    <div className={cn('flex', className)} {...rest}>
      {children}
    </div>
  );
};
Flex.displayName = 'Flex';
export { Flex };
