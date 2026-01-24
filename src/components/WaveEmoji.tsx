"use client";

import { useState, useEffect } from "react";

export default function WaveEmoji() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <span className="inline-block ml-2 animate-fade-out">
      <span className="text-4xl animate-wave inline-block">👋</span>
    </span>
  );
}
