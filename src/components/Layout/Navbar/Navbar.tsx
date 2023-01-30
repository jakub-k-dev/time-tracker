import { useLocation } from "react-router-dom";

import CurrentTime from "./CurrentTime";
import NavItem from "./NavItem";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "List", href: "/list" },
  { name: "Faq", href: "/faq" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky bg-primary-main m-4 rounded-2xl">
      <div className="mx-auto px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="h-8 w-auto" src="/clock.svg" alt="Time tracker" />
          <div className="flex gap-4">
            {navigation.map(({ href, name }) => (
              <NavItem
                key={name}
                href={href}
                name={name}
                isActive={href === pathname}
              />
            ))}
          </div>
        </div>
        <div>
          <CurrentTime />
        </div>
      </div>
    </nav>
  );
}
