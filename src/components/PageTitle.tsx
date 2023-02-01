import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageTitle({ children }: Props) {
  return <h1 className="text-3xl font-bold text-secondary-text">{children}</h1>;
}
