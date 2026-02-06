import { Box } from '../../ui/box';

interface ContainerBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function ContainerBox({ children, ...rest }: ContainerBoxProps) {
  return <Box {...rest}>{children}</Box>;
}
