import { useEffect, useRef, useState } from "react";

type Params = {
  onMouseUp: (endDeltaX: number) => void;
};

export const useToastDrag = ({ onMouseUp }: Params) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);
  const [deltaX, setDeltaX] = useState(0);
  const deltaXRef = useRef(deltaX);

  useEffect(() => {
    deltaXRef.current = deltaX;
  }, [deltaX]);

  const handleMouseDown = (event: MouseEvent) => {
    startX.current = event.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    onMouseUp(deltaXRef.current);
    startX.current = null;
    if (ref.current) {
      setDeltaX(0);
    }

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    if (startX.current !== null && ref.current) {
      setDeltaX(event.clientX - startX.current);
    }
  };

  useEffect(() => {
    ref.current?.addEventListener("mousedown", handleMouseDown);
    return () => ref.current?.removeEventListener("mousedown", handleMouseDown);
  }, [ref.current]);

  return { ref, deltaX };
};
