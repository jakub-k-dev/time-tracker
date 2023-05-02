import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { useIntId } from "src/hooks/useIntId";

import { Toast } from "./types";

type ToastWithoutId = Omit<Toast, "id">;

const ToastServiceContext = createContext<Toast[]>([]);

const ToastServiceDispatchContext = createContext<any>(null!);

type Props = { children: ReactNode };

export default function ToastServiceProvider({ children }: Props) {
  const [toasts, dispatch] = useReducer(toastServiceReducer, []);
  const getNewId = useIntId();

  const addNewToastAction = useCallback(
    (toast: ToastWithoutId, timeout: number = 10000) => {
      const id = `toast-${getNewId()}`;
      dispatch({
        type: "ADD",
        payload: { toast: { id, ...toast } },
      });

      if (timeout !== 0) {
        setTimeout(() => {
          removeToastAction(id);
        }, timeout);
      }
    },
    []
  );

  const removeToastAction = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      payload: { id },
    });
    setTimeout(() => {
      dispatch({
        type: "FORCE_REMOVE",
        payload: { id },
      });
    }, 1000);
  }, []);

  return (
    <ToastServiceContext.Provider value={toasts}>
      <ToastServiceDispatchContext.Provider
        value={{ addNewToastAction, removeToastAction }}
      >
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
  payload: { toast: Toast };
};
type ToastServiceRemoveToastAction = {
  type: "REMOVE";
  payload: { id: string };
};
type ToastServiceForceRemoveToastAction = {
  type: "FORCE_REMOVE";
  payload: { id: string };
};

type ToastServiceActions =
  | ToastServiceAddToastAction
  | ToastServiceRemoveToastAction
  | ToastServiceForceRemoveToastAction;

function toastServiceReducer(
  toasts: Toast[],
  action: ToastServiceActions
): Toast[] {
  switch (action.type) {
    case "ADD": {
      return [
        ...toasts,
        {
          ...action.payload.toast,
        },
      ];
    }
    case "REMOVE": {
      return toasts.map((toast) => {
        if (toast.id === action.payload.id) {
          return { ...toast, isBeeingRemoved: true };
        }
        return toast;
      });
    }
    case "FORCE_REMOVE": {
      return toasts.filter((toast) => toast.id !== action.payload.id);
    }
    default: {
      return toasts;
    }
  }
}
