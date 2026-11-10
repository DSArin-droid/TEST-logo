import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./CinematicSlashReveal.css";

/**
 * Cinematic slash logo reveal with macro cuts and aperture wipe.
 * Preserves the exact original SVG rendered directly from svgSrc.
 */
export default function CinematicSlashReveal({
  svgSrc = "/logo.svg",
  width = 320,
  duration = 5.2,
  loop = false,
  className = "",
  ariaLabel = "Cinematic animated logo",
}) {
  const reduceMotion = useReducedMotion();
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduceMotion || loop) return undefined;
    const timer = window.setTimeout(() => setRun(1), duration * 1000);
    return () => window.clearTimeout(timer);
  }, [duration, loop, reduceMotion, run]);

  const restart = () => setRun((v) => v + 1);

  if (reduceMotion) {
    return (
      <div className={`cinematic-reveal ${className}`} style={{ width }} role="img" aria-label={ariaLabel}>
        <img className="cinematic-reveal__final" src={svgSrc} alt="" draggable="false" />
      </div>
    );
  }

  return (
    <div
      className={`cinematic-reveal ${className}`}
      style={{ "--reveal-duration": `${duration}s`, width }}
      role="img"
      aria-label={ariaLabel}
      onMouseEnter={restart}
      onClick={restart}
      onAnimationEnd={(e) => {
        if (loop && e.target === e.currentTarget) restart();
      }}
    >
      <div className="cinematic-reveal__stage" key={run}>
        {/* Fast opposing diagonal shutters */}
        <motion.div
          className="cinematic-reveal__slash cinematic-reveal__slash--one"
          initial={{ x: "-130%", opacity: 1 }}
          animate={{ x: "180%", opacity: [1, 1, 0] }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="cinematic-reveal__slash cinematic-reveal__slash--two"
          initial={{ x: "130%", opacity: 1 }}
          animate={{ x: "-180%", opacity: [1, 1, 0] }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Rapid macro inserts */}
        <div className="cinematic-reveal__macro cinematic-reveal__macro--a">
          <img src={svgSrc} alt="" draggable="false" />
        </div>
        <div className="cinematic-reveal__macro cinematic-reveal__macro--b">
          <img src={svgSrc} alt="" draggable="false" />
        </div>
        <div className="cinematic-reveal__macro cinematic-reveal__macro--c">
          <img src={svgSrc} alt="" draggable="false" />
        </div>

        {/* Hard-edged diagonal aperture reveals the full original SVG */}
        <motion.div
          className="cinematic-reveal__wipe"
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={{
            clipPath: [
              "polygon(0 0, 0 0, 0 100%, 0 100%)",
              "polygon(0 0, 0 0, 0 100%, 0 100%)",
              "polygon(0 0, 100% 0, 72% 100%, 0 100%)",
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ],
          }}
          transition={{ duration: 1.15, delay: 1.65, ease: [0.7, 0, 0.2, 1] }}
        >
          <img src={svgSrc} alt="" draggable="false" />
        </motion.div>

        {/* Final lockup with a subtle scale settle */}
        <motion.div
          className="cinematic-reveal__lockup"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: [0, 1, 1], scale: [1.06, 1, 1] }}
          transition={{ duration: 1.55, delay: 3.55, times: [0, 0.35, 1], ease: [0.2, 0.8, 0.2, 1] }}
        >
          <img src={svgSrc} alt="" draggable="false" />
        </motion.div>
      </div>

      {loop && (
        <button className="cinematic-reveal__replay" type="button" onClick={restart}>
          Replay
        </button>
      )}
    </div>
  );
}

