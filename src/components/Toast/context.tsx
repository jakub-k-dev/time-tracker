import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useId,
  useReducer,
} from "react";

import { Toast } from "./types";

type ToastWithoutId = Omit<Toast, "id">;

const ToastServiceContext = createContext<Toast[]>([]);

const ToastServiceDispatchContext = createContext<
  Dispatch<ToastServiceActions>
>(null!);

type Props = { children: ReactNode };

export default function ToastServiceProvider({ children }: Props) {
  const [toasts, dispatch] = useReducer(toastServiceReducer, []);

  return (
    <ToastServiceContext.Provider value={toasts}>
      <ToastServiceDispatchContext.Provider value={dispatch}>
        {children}
      </ToastServiceDispatchContext.Provider>
    </ToastServiceContext.Provider>
  );
}

export function useToastService() {
  return useContext(ToastServiceContext);
}

export function useToastServiceDispatch() {
  return useContext(ToastServiceDispatchContext);
}

type ToastServiceAddToastAction = {
  type: "ADD";
  payload: { toast: ToastWithoutId };
};
type ToastServiceEditToastAction = {
  type: "EDIT";
  payload: { id: string; toast: Toast };
};
type ToastServiceRemoveToastAction = {
  type: "REMOVE";
  payload: { id: string };
};

type ToastServiceActions =
  | ToastServiceAddToastAction
  | ToastServiceEditToastAction
  | ToastServiceRemoveToastAction;

function toastServiceReducer(
  toasts: Toast[],
  action: ToastServiceActions
): Toast[] {
  switch (action.type) {
    case "ADD": {
      const id = useId();
      return [
        ...toasts,
        {
          ...action.payload.toast,
          id,
        },
      ];
    }
    case "EDIT": {
      return toasts.map((t) => {
        if (t.id === action.payload.toast.id) {
          return action.payload.toast;
        }
        return t;
      });
    }
    case "REMOVE": {
      return toasts.filter((toast) => toast.id !== action.payload.id);
    }
  }
}
