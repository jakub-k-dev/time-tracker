import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

type MenuItem = { name: string; href: string };

const menuItems: MenuItem[] = [
  { name: "New Form", href: "/new-form" },
  { name: "Testing", href: "/testing" },
  { name: "Not found page", href: "/i-found-it" },
];

function MenuList() {
  return (
    <div className="text-sm font-semibold leading-6 text-gray-900 flex flex-col gap-2">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="block hover:text-indigo-600"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default function Menu() {
  return (
    <>
      <Popover className="relative hidden lg:block">
        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          <span>Menu</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
            <div className="w-56 shrink rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-900/5">
              <MenuList />
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="lg:hidden">
        <MenuList />
      </div>
    </>
  );
}
