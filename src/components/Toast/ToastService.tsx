import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";

import ToastServiceProvider, { useToastService } from "./context";
import { ToastVariant } from "./types";

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

function Toasts() {
  const toasts = useToastService();

  return (
    <div className="absolute bg-transparent top-0 right-0 p-8 flex flex-col gap-4">
      {toasts.map(({ variant }) => (
        <div className="w-64 bg-white rounded-md drop-shadow-2xl flex items-center gap-2">
          <div
            className={`w-4 rounded-l-md drop-shadow-m self-stretch ${variants[variant].color}`}
          />
          {variants[variant].icon}
          <div className="p-3 pl-0">
            <h3 className="font-bold">Title piči</h3>
            <p>piči</p>
          </div>
        </div>
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
