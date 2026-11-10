import React, { useState } from 'react';
import LogoReveal from './components/LogoReveal';
import LogoBreathe from './components/LogoBreathe';

export default function App() {
  const [key, setKey] = useState(0);

  return (
    <div className="container">
      <div className="card" onMouseEnter={() => setKey((k) => k + 1)}>
        <p className="label">1. Reveal on Hover</p>
        <LogoReveal key={key} />
      </div>
      <div className="card">
        <p className="label">2. Breathe In / Out</p>
        <LogoBreathe />
      </div>
    </div>
  );
}
