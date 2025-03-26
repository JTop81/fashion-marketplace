import { ComponentProps } from "react";
import clsx from "clsx";

import Button from "./Button";

type ProductActionProps = {
  action: React.ReactNode;
  icon: React.ReactNode;
} & ComponentProps<typeof Button>;

const ProductAction = ({
  action,
  icon,
  className,
  ...rest
}: ProductActionProps) => {
  return (
    <Button
      variant="text"
      {...rest}
      className={clsx("flex items-center gap-x-3", className)}
    >
      <div className="text-2xl ">{icon}</div>
      {action}
    </Button>
  );
};

export { ProductAction };
