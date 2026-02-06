import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface SimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const SimpleGrid = ({ children, className, ...rest }: SimpleGridProps) => {
  return (
    <div
      className={cn(
        'mb-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-1',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

SimpleGrid.displayName = 'SimpleGrid';

export { SimpleGrid };
