import { ReactNode } from "react";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-full">
      <Navbar />
      <div className="py-10 flex flex-col gap-8">{children}</div>
      <Footer />
    </div>
  );
}
