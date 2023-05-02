import { HomeIcon } from "@heroicons/react/20/solid";
import { Fragment, ReactNode } from "react";
import { Link } from "react-router-dom";

const breadcrumbNameMap: Record<string, ReactNode> = {
  "/": <HomeIcon className="h-5 w-5 flex-shrink-0" />,
  "/list": "List",
  "/faq": "Faq",
};

type Props = {
  paths: string[];
};

export default function Breadcrumbs({ paths }: Props) {
  return (
    <nav
      className="flex border-b border-gray-200 bg-white"
      aria-label="Breadcrumb"
    >
      <p className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8 h-11">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          if (index === 0) {
            return (
              <Link
                key="/"
                to="/"
                className="flex items-center text-gray-400 hover:text-gray-500 last:text-gray-700 last:hover:text-gray-900"
              >
                <span>
                  {breadcrumbNameMap["/"]}
                  <span className="sr-only">Home</span>
                </span>
              </Link>
            );
          }
          const href = paths.slice(1, index + 1).join("");

          return (
            <Fragment key={href}>
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                to={href}
                className="flex items-center font-medium last:font-bold ml-4 text-sm"
                aria-current={isLast ? "page" : undefined}
              >
                {breadcrumbNameMap[path] || path.substring(1)}
              </Link>
            </Fragment>
          );
        })}
      </p>
    </nav>
  );
}
