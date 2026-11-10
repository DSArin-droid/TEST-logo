import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./OrbitMovingLines.css";

/**
 * Orbit + moving-line logo reveal.
 * The SVG is loaded as an image. Its path geometry and fills are not modified.
 */
export default function OrbitMovingLines({
  svgSrc = "/logo.svg",
  width = 320,
  duration = 3.2,
  replay = false,
  className = "",
  ariaLabel = "Animated logo",
}) {
  const reduceMotion = useReducedMotion();
  const [run, setRun] = useState(0);

  const restart = () => setRun((n) => n + 1);

  useEffect(() => {
    if (reduceMotion || !replay) return undefined;
    const timer = window.setTimeout(() => setRun((n) => n + 1), duration * 1000);
    return () => window.clearTimeout(timer);
  }, [duration, reduceMotion, replay, run]);

  if (reduceMotion) {
    return (
      <div className={`orbit-moving-lines ${className}`} style={{ width }} role="img" aria-label={ariaLabel}>
        <img src={svgSrc} alt="" />
      </div>
    );
  }

  return (
    <div
      className={`orbit-moving-lines ${className}`}
      style={{ width }}
      role="img"
      aria-label={ariaLabel}
      onMouseEnter={restart}
      onClick={restart}
    >
      <div className="orbit-moving-lines__scene" key={run}>
        {/* Orbit arcs are separate graphic elements. */}
        <svg className="orbit-moving-lines__orbits" viewBox="0 0 512 512" aria-hidden="true">
          <motion.circle
            cx="256"
            cy="256"
            r="190"
            fill="none"
            stroke="#777"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="250 945"
            initial={{ opacity: 0, rotate: -70 }}
            animate={{ opacity: [0, 0.55, 0.55, 0], rotate: 290 }}
            transition={{ duration: 3.6, ease: "linear" }}
            style={{ transformOrigin: "256px 256px" }}
          />
          <motion.circle
            cx="256"
            cy="256"
            r="164"
            fill="none"
            stroke="#aaa"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="190 840"
            initial={{ opacity: 0, rotate: 145 }}
            animate={{ opacity: [0, 0.4, 0.4, 0], rotate: 505 }}
            transition={{ duration: 3.1, delay: 0.15, ease: "linear" }}
            style={{ transformOrigin: "256px 256px" }}
          />
        </svg>

        {/* Each layer uses the original SVG, clipped to a separate region. */}
        <motion.div
          className="orbit-moving-lines__piece orbit-moving-lines__piece--one"
          initial={{ y: -115, opacity: 0, rotate: -4 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.25, delay: 0.55, ease: [0.16, 0.72, 0.22, 1] }}
        >
          <img src={svgSrc} alt="" draggable="false" />
        </motion.div>

        <motion.div
          className="orbit-moving-lines__piece orbit-moving-lines__piece--two"
          initial={{ y: 105, opacity: 0, rotate: 4 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.25, delay: 0.82, ease: [0.16, 0.72, 0.22, 1] }}
        >
          <img src={svgSrc} alt="" draggable="false" />
        </motion.div>

        <motion.div
          className="orbit-moving-lines__piece orbit-moving-lines__piece--three"
          initial={{ x: -105, y: -48, opacity: 0, rotate: -8 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.25, delay: 1.08, ease: [0.16, 0.72, 0.22, 1] }}
        >
          <img src={svgSrc} alt="" draggable="false" />
        </motion.div>

        <motion.div
          className="orbit-moving-lines__piece orbit-moving-lines__piece--four"
          initial={{ x: -105, y: 48, opacity: 0, rotate: 8 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.25, delay: 1.34, ease: [0.16, 0.72, 0.22, 1] }}
        >
          <img src={svgSrc} alt="" draggable="false" />
        </motion.div>

        {/* Final original SVG locks over the assembled pieces. */}
        <motion.div
          className="orbit-moving-lines__final"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{ duration: 0.2, delay: 2.75, times: [0, 0.4, 1] }}
        >
          <img src={svgSrc} alt="" draggable="false" />
        </motion.div>
      </div>

      {replay && (
        <button
          type="button"
          className="orbit-moving-lines__replay"
          onClick={restart}
        >
          Replay
        </button>
      )}
    </div>
  );
}

