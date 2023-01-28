import { Link } from "react-router-dom";

type Props = {
  isActive: boolean;
  href: string;
  name: string;
};

export default function NavItem({ href, isActive, name }: Props) {
  return (
    <Link
      to={href}
      className={`${
        isActive
          ? "bg-secondary-alt"
          : "bg-secondary-main hover:bg-secondary-alt"
      }  text-white px-3 py-2 rounded-md text-sm font-medium`}
      aria-current={isActive ? "page" : undefined}
    >
      {name}
    </Link>
  );
}
