import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useLayoutEffect, useRef, useState } from "react";
import { useToastDrag } from "src/components/Toast/useToastDrag";

import ToastServiceProvider, { useToast, useToastService } from "./context";
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

type ToastProps = { toast: Toast; removeToast: () => void };

function ToastItem({
  toast: { content, title, variant, isBeeingRemoved },
  removeToast,
}: ToastProps) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>();
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseUpAfterDrag = (endDeltaX: number) => {
    if (Math.abs(endDeltaX) > width) {
      removeToast();
    }
  };

  const { ref: dragRef, deltaX } = useToastDrag({
    onMouseUp: handleMouseUpAfterDrag,
  });

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, []);

  const normalStyles = {
    height: `${height}px`,
    transform: `translateX(${deltaX}px) scale(1)`,
    opacity: 1 - Math.abs(deltaX / 2) / (width || 1),
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
    marginBottom: "0rem",
  };

  const removingStyles = {
    height: "0px",
    transform: `translateX(${deltaX}px) scale(0)`,
    opacity: 0,
    transitionDuration: "1000ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    marginBottom: "-1rem",
  };

  return (
    <Transition
      show={!isBeeingRemoved}
      as={Fragment}
      leave="ease-in-out duration-1000"
      leaveFrom="text-base"
      leaveTo="text-0"
    >
      <div
        ref={(e) => {
          ref.current = e;
          dragRef.current = e;
        }}
        style={isBeeingRemoved ? removingStyles : normalStyles}
        className="select-none transition-all w-full sm:w-64 bg-white rounded-md drop-shadow-2xl flex items-center gap-2 pointer-events-auto"
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
  const { removeToastAction } = useToastService();
  const toasts = useToast();
  return (
    <div className="absolute bg-transparent p-8 flex flex-col max-sm:flex-col-reverse gap-4 pointer-events-none max-sm:bottom-0 max-sm:inset-x-0 sm:top-0 sm:right-0">
      {toasts.map((toast) => (
        <ToastItem
          toast={toast}
          key={toast.id}
          removeToast={() => removeToastAction(toast.id)}
        />
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
