import { ReactNode } from "react";

import Navbar from "./Navbar/Navbar";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen bg-secondary-main">
      <div className="mx-32 bg-secondary-alt h-full overflow-auto shadow-xl">
        <Navbar />
        <div className="p-16 pt-8">{children}</div>
      </div>
    </div>
  );
}
