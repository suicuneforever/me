import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(new Date());

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return <span>{formattedTime}</span>;
}

export default Clock;
