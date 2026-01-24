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
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-fade-out">
      <span className="text-7xl animate-wave inline-block">👋</span>
    </div>
  );
}
