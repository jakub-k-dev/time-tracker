import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useLayoutEffect, useRef, useState } from "react";

import ToastServiceProvider, { useToastService } from "./context";
import { Toast, ToastVariant } from "./types";

type VariantProps = {
  color: string;
  icon?: ReactNode;
};

const variants: Record<ToastVariant, VariantProps> = {
  success: {
    color: "bg-lime-500",
    icon: <CheckCircleIcon className="h-7 text-lime-500" />,
  },
  error: {
    color: "bg-red-600",
    icon: <ExclamationCircleIcon className="h-7 text-red-600" />,
  },
  info: {
    color: "bg-blue-600",
    icon: <InformationCircleIcon className="h-7 text-blue-600" />,
  },
  warning: {
    color: "bg-yellow-400",
    icon: <ExclamationTriangleIcon className="h-7 text-yellow-400" />,
  },
};

type ToastProps = { toast: Toast };

function ToastItem({
  toast: { content, title, variant, isBeeingRemoved },
}: ToastProps) {
  const [height, setHeight] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    ref.current && setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  return (
    <Transition
      show={!isBeeingRemoved}
      as={Fragment}
      leave="ease-in-out duration-1000"
      leaveFrom="opacity-100 scale-100 text-base"
      leaveTo="opacity-0 scale-0 text-0"
    >
      <div
        ref={ref}
        style={{ height: isBeeingRemoved ? "0px" : `${height}px` }}
        className="transition-all ease-in-out duration-1000 w-64 bg-white rounded-md drop-shadow-2xl flex items-center gap-2 pointer-events-auto"
      >
        <div
          className={`w-4 rounded-l-md drop-shadow-m self-stretch ${variants[variant].color}`}
        />
        {variants[variant].icon}
        <div className="p-3 pl-0">
          <h3 className="font-bold">{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    </Transition>
  );
}

function Toasts() {
  const toasts = useToastService();
  return (
    <div className="absolute bg-transparent top-0 right-0 p-8 flex flex-col gap-4 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem toast={toast} key={toast.id} />
      ))}
    </div>
  );
}

type Props = {
  children: ReactNode;
};

export default function ToastServiceWithProvider({ children }: Props) {
  return (
    <ToastServiceProvider>
      {children}
      <Toasts />
    </ToastServiceProvider>
  );
}
