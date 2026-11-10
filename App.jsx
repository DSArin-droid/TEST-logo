import React, { useState } from 'react';
import KineticSnap from './components/KineticSnap';
import MyLogoReferenceAnimation from './components/MyLogoReferenceAnimation';
import BlueprintTrace from './components/BlueprintTrace';
import CinematicSlashReveal from './components/CinematicSlashReveal';
import LogoReveal from './components/LogoReveal';
import LogoBreathe from './components/LogoBreathe';
import OrbitMovingLines from './components/OrbitMovingLines';

export default function App() {
  const [traceKey, setTraceKey] = useState(0);
  const [revealKey, setRevealKey] = useState(0);

  return (
    <div className="container">
      {/* 1. Kinetic Snap */}
      <div className="card">
        <p className="label">1. Kinetic Snap (Hover / Loop)</p>
        <KineticSnap size={220} />
      </div>

      {/* 2. Reference Spin Assemble */}
      <div className="card">
        <p className="label">2. Spin Assemble (Hover)</p>
        <MyLogoReferenceAnimation size={220} />
      </div>

      {/* 3. Blueprint Trace */}
      <div
        className="card"
        onClick={() => setTraceKey((k) => k + 1)}
        onMouseEnter={() => setTraceKey((k) => k + 1)}
      >
        <p className="label">3. Blueprint Trace (Hover)</p>
        <BlueprintTrace key={traceKey} size={220} />
      </div>

      {/* 4. Cinematic Slash */}
      <div className="card">
        <p className="label">4. Cinematic Slash (Hover)</p>
        <CinematicSlashReveal width={220} />
      </div>

      {/* 5. Stroke Reveal */}
      <div className="card" onMouseEnter={() => setRevealKey((k) => k + 1)}>
        <p className="label">5. Stroke Reveal (Hover)</p>
        <LogoReveal key={revealKey} />
      </div>

      {/* 6. Breathe In / Out */}
      <div className="card">
        <p className="label">6. Breathe In / Out</p>
        <LogoBreathe />
      </div>

      {/* 7. Orbit Moving Lines */}
      <div className="card">
        <p className="label">7. Orbit Moving Lines (Hover)</p>
        <OrbitMovingLines width={220} />
      </div>
    </div>
  );
}
