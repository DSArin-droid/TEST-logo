import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./BlueprintTrace.css";

const STROKES = [
  {
    d: "M229.131 187.55C237.391 179.349 237.391 166.051 229.131 157.85C220.871 149.649 207.478 149.649 199.218 157.85L116.957 239.525C108.696 247.727 108.696 261.024 116.957 269.225C125.217 277.427 138.61 277.427 146.87 269.225L229.131 187.55Z",
    clip: { x: 105, y: 145, width: 135, maxH: 135 }
  },
  {
    d: "M229.131 271.555C237.391 263.353 237.391 250.056 229.131 241.855C220.871 233.653 207.478 233.653 199.218 241.855L116.957 323.53C108.696 331.731 108.696 345.028 116.957 353.23C125.217 361.431 138.61 361.431 146.87 353.23L229.131 271.555Z",
    clip: { x: 105, y: 230, width: 135, maxH: 135 }
  },
  {
    d: "M313.518 174.652C313.518 162.97 304.048 153.5 292.366 153.5C280.684 153.5 271.214 162.97 271.214 174.652V342.36C271.214 354.042 280.684 363.512 292.366 363.512C304.048 363.512 313.518 354.042 313.518 342.36V174.652Z",
    clip: { x: 265, y: 145, width: 55, maxH: 225 }
  },
  {
    d: "M387.549 174.652C387.549 162.97 378.079 153.5 366.397 153.5C354.716 153.5 345.246 162.97 345.246 174.652V289.857C345.246 301.539 354.716 311.009 366.397 311.009C378.079 311.009 387.549 301.539 387.549 289.857V174.652Z",
    clip: { x: 340, y: 145, width: 55, maxH: 175 }
  }
];

export default function BlueprintTrace({
  size = 320,
  duration = 2.4,
  stagger = 0.25,
  showGrid = true,
  className = ""
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();

  // Phase timings derived from duration (default 2.4s):
  // Phase 1 (Grid In): 0.0s - 0.3s
  // Phase 2 (Strokes Reveal): 0.3s - 1.8s
  // Phase 3 (Grid Out): 1.8s - 2.4s
  const strokeDuration = 0.65;
  const startDelay = 0.3;

  return (
    <div
      className={`blueprint-trace ${className}`.trim()}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Blueprint Trace Logo"
    >
      <svg
        className="blueprint-trace__svg"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Technical Drafting Grid */}
          <pattern id={`bp-grid-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#cbd5e1" strokeWidth="0.6" strokeDasharray="1 3" />
          </pattern>

          {/* Individual Rectangular Clipping Masks for each stroke */}
          {STROKES.map((s, i) => (
            <clipPath key={i} id={`clip-${id}-${i}`}>
              <motion.rect
                x={s.clip.x}
                y={s.clip.y}
                width={s.clip.width}
                initial={{ height: reduce ? s.clip.maxH : 0 }}
                animate={{ height: s.clip.maxH }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : {
                        duration: strokeDuration,
                        delay: startDelay + i * stagger,
                        ease: [0.16, 1, 0.3, 1]
                      }
                }
              />
            </clipPath>
          ))}
        </defs>

        {/* Original white circular background */}
        <path
          d="M0 256C0 397.385 114.615 512 256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256Z"
          fill="white"
        />

        {/* Phase 1 & 3: Subtle Blueprint Drafting Grid */}
        {showGrid && (
          <motion.rect
            width="512"
            height="512"
            fill={`url(#bp-grid-${id})`}
            initial={{ opacity: 0 }}
            animate={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: [0, 1, 1, 0],
                    transition: {
                      duration: duration,
                      times: [0, 0.125, 0.75, 1],
                      ease: "linear"
                    }
                  }
            }
          />
        )}

        {/* Phase 2 & 4: Four Original Logo Strokes */}
        {STROKES.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="black"
            clipPath={`url(#clip-${id}-${i})`}
          />
        ))}
      </svg>
    </div>
  );
}

