import type { ComponentProps, ReactNode } from "react";

import { UiText } from "../../ui/text";
import { cn } from "../../../lib/utils";

type ShadType = ComponentProps<typeof UiText>;

interface TextTitleProps extends ShadType {
  children: ReactNode;
  className?: string;
}

export default function TextTitle({
  children,
  className,
  ...rest
}: TextTitleProps) {
  return (
    <UiText className={cn("font-dyna font-medium", className)} {...rest}>
      {children}
    </UiText>
  );
}
