import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <div>{format(currentTime, "pp")}</div>;
}
