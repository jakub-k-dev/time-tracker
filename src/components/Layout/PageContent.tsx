import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageContent({ children }: Props) {
  return (
    <main>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}
