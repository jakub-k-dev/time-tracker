import { ReactNode } from "react";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="py-10 flex flex-col gap-8 flex-grow">{children}</div>
      <Footer />
    </>
  );
}
