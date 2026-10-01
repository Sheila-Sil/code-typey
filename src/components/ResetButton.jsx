import React, { useEffect, useState } from "react";

/**
 * Resetting wipes every run, best and weak-key statistic, so it takes a second,
 * deliberate click — and it lives beside the history it erases rather than in
 * the toolbar, one slip away from "retry".
 */
export default function ResetButton({ onReset }) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return undefined;
    const t = setTimeout(() => setConfirming(false), 4000);
    return () => clearTimeout(t);
  }, [confirming]);

  return (
    <button
      className={`tt-btn ghost danger${confirming ? " confirming" : ""}`}
      onClick={() => {
        if (confirming) {
          setConfirming(false);
          onReset();
        } else {
          setConfirming(true);
        }
      }}
      onBlur={() => setConfirming(false)}
      aria-live="polite"
    >
      {confirming ? "click again to erase all stats" : "reset profile"}
    </button>
  );
}
