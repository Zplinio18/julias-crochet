import type { ComponentProps, ReactNode } from "react";

import { UiText } from "../../ui/text";
import { cn } from "../../../lib/utils";

type ShadType = ComponentProps<typeof UiText>;

interface TextDefaultProps extends ShadType {
  children: ReactNode;
  className?: string;
}

export default function TextDefault({
  children,
  className,
  ...rest
}: TextDefaultProps) {
  return (
    <UiText className={cn("font-exo2", className)} {...rest}>
      {children}
    </UiText>
  );
}
