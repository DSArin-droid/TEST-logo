import React, { useState } from 'react';
import BlueprintTrace from './components/BlueprintTrace';
import LogoReveal from './components/LogoReveal';
import LogoBreathe from './components/LogoBreathe';

export default function App() {
  const [traceKey, setTraceKey] = useState(0);
  const [revealKey, setRevealKey] = useState(0);

  return (
    <div className="container">
      {/* 1. Blueprint Trace Feature */}
      <div
        className="card"
        onClick={() => setTraceKey((k) => k + 1)}
        onMouseEnter={() => setTraceKey((k) => k + 1)}
      >
        <p className="label">1. Blueprint Trace (Hover to Trace)</p>
        <BlueprintTrace key={traceKey} size={240} />
      </div>

      {/* 2. Reveal on Hover */}
      <div className="card" onMouseEnter={() => setRevealKey((k) => k + 1)}>
        <p className="label">2. Reveal on Hover</p>
        <LogoReveal key={revealKey} />
      </div>

      {/* 3. Breathe In / Out */}
      <div className="card">
        <p className="label">3. Breathe In / Out</p>
        <LogoBreathe />
      </div>
    </div>
  );
}
