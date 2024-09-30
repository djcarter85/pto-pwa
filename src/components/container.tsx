import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-w-xl">{children}</div>;
};
