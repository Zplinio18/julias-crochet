import { Flex } from '../../ui/flex';

interface ContainerFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContainerFlex({ children, ...rest }: ContainerFlexProps) {
  return <Flex {...rest}>{children}</Flex>;
}
