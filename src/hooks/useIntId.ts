import { useRef } from "react";

export const useIntId = () => {
  const id = useRef(0);

  return () => ++id.current;
};
