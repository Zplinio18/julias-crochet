import type { ReactNode } from 'react';

import { cn } from '../../lib/utils';

interface TextProps {
  children: ReactNode;
  className?: string;
}

const UiText = ({ children, className = '' }: TextProps) => {
  return <span className={cn('text', className)}> {children}</span>;
};

UiText.displayName = 'Text';
export { UiText };
