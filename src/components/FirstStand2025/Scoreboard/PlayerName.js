import { useRef } from "react";

const playerLogs = new Set();

export default function PlayerName({ name, isDead }) {
  const isFirstRender = useRef(true);
  if (isFirstRender.current) {
    playerLogs.add(name);
    isFirstRender.current = false;
  }

  return (
    <div className="text-white text-sm font-semibold" style={{ filter: isDead ? "grayscale(100%)" : "none" }}>
      {name}
    </div>
  );
}
