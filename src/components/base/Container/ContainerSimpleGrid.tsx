import { SimpleGrid } from '../../ui/simple-grid';

interface ContainerSimpleGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContainerSimpleGrid({
  children,
  ...rest
}: ContainerSimpleGridProps) {
  return <SimpleGrid {...rest}>{children}</SimpleGrid>;
}
