import { ReactNode } from "react";

export type ToastVariant = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  title: string;
  content: string | ReactNode;
  variant: ToastVariant;
};
