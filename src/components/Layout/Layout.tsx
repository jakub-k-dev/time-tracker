import { Outlet, useLocation } from "react-router-dom";

import Breadcrumbs from "../Breadcrumbs";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

type Props = {};

export default function Layout({}: Props) {
  const { pathname } = useLocation();
  const paths = ["/", ...(pathname.match(/(\/[^/]+)/g) || [])];
  return (
    <>
      <Navbar />
      <Breadcrumbs paths={paths} />
      <div className="py-10 flex flex-col gap-8 flex-grow">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
