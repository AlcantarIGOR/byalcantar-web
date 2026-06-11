"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Mexico_City",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTime(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Hydration guard to prevent SSR mismatch
  if (!time) return <span className="animate-pulse">Loading...</span>;

  return <span>{time}</span>;
}
