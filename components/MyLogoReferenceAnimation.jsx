import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./MyLogoReferenceAnimation.css";

// Exact path data from the supplied logo SVG.
const LOGO_PATHS = [
  { d: 'M313.518 174.652C313.518 162.97 304.048 153.5 292.366 153.5C280.684 153.5 271.214 162.97 271.214 174.652V342.36C271.214 354.042 280.684 363.512 292.366 363.512C304.048 363.512 313.518 354.042 313.518 342.36V174.652Z', fill: 'black' },
  { d: 'M387.549 174.652C387.549 162.97 378.079 153.5 366.397 153.5C354.716 153.5 345.246 162.97 345.246 174.652V289.857C345.246 301.539 354.716 311.009 366.397 311.009C378.079 311.009 387.549 301.539 387.549 289.857V174.652Z', fill: 'black' },
  { d: 'M229.131 187.55C237.391 179.349 237.391 166.051 229.131 157.85C220.871 149.649 207.478 149.649 199.218 157.85L116.957 239.525C108.696 247.727 108.696 261.024 116.957 269.225C125.217 277.427 138.61 277.427 146.87 269.225L229.131 187.55Z', fill: 'black' },
  { d: 'M229.131 271.555C237.391 263.353 237.391 250.056 229.131 241.855C220.871 233.653 207.478 233.653 199.218 241.855L116.957 323.53C108.696 331.731 108.696 345.028 116.957 353.23C125.217 361.431 138.61 361.431 146.87 353.23L229.131 271.555Z', fill: 'black' }
];

const START = [
  { x: -145, y: -135, rotate: -135 },
  { x: 145, y: -125, rotate: 135 },
  { x: -145, y: 130, rotate: 135 },
  { x: 145, y: 130, rotate: -135 },
];

const TIMES = [0, 1.25 / 5.15, 1.85 / 5.15, 2.65 / 5.15, 3.55 / 5.15, 1];

export default function MyLogoReferenceAnimation({
  size = 220,
  duration = 5.15,
  loop = false,
  className = "",
  ariaLabel = "Animated logo",
}) {
  const reduceMotion = useReducedMotion();
  const [run, setRun] = useState(0);

  const restart = () => setRun((v) => v + 1);

  useEffect(() => {
    if (!loop || reduceMotion) return undefined;
    const timer = window.setTimeout(() => setRun((v) => v + 1), duration * 1000);
    return () => window.clearTimeout(timer);
  }, [duration, loop, reduceMotion, run]);

  if (reduceMotion) {
    return (
      <div className={`my-logo-animation ${className}`} style={{ width: size }} role="img" aria-label={ariaLabel}>
        <svg viewBox="0 0 512 512" aria-hidden="true">
          <path d="M0 256C0 397.385 114.615 512 256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256Z" fill="white" />
          {LOGO_PATHS.map((p, i) => <path key={i} d={p.d} fill={p.fill} />)}
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`my-logo-animation ${className}`}
      style={{ width: size }}
      role="img"
      aria-label={ariaLabel}
      onMouseEnter={restart}
      onClick={restart}
    >
      <svg key={run} viewBox="0 0 512 512" aria-hidden="true">
        <path d="M0 256C0 397.385 114.615 512 256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256Z" fill="white" />
        {LOGO_PATHS.map((path, index) => {
          const start = START[index];
          return (
            <motion.g
              key={index}
              initial={{ x: start.x, y: start.y, rotate: start.rotate, opacity: 0.15 }}
              animate={{
                x: [start.x, 0, 0, start.x, 0, 0],
                y: [start.y, 0, 0, start.y, 0, 0],
                rotate: [start.rotate, 0, 0, start.rotate, 0, 0],
                opacity: [0.15, 1, 1, 0.2, 1, 1],
              }}
              transition={{
                duration,
                times: TIMES,
                ease: ["easeOut", "linear", "easeInOut", "easeOut", "linear"],
                repeat: loop ? Infinity : 0,
                repeatDelay: 0,
              }}
              style={{ transformOrigin: "256px 256px" }}
            >
              <path d={path.d} fill={path.fill} />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

