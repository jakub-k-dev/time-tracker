import { useRef } from "react";

export const useIntId = () => {
  const id = useRef(0);
  const getNewId = () => {
    id.current += 1;
    return id.current;
  };

  return getNewId;
};
