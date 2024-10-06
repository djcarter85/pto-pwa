import cx from "classix";
import { ReactNode } from "react";

export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cx("mx-auto max-w-xl", className)}>{children}</div>;
};
