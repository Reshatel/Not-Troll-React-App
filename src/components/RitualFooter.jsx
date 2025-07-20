import React, { useState } from 'react';
import './RitualFooter.css';

const RitualFooter = () => {
  const [phase, setPhase] = useState('idle');

  const startSequence = () => {
    if (phase !== 'idle') return;
    setPhase('phase1');

    setTimeout(() => setPhase('phase2'), 1200);
    setTimeout(() => setPhase('phase3'), 2500);
  };

  return (
    <div className="footer-wrapper">
      {/* Руки — позаду футера */}
      <div className="hands-container-global">
        <div className={`hands-layer ${phase}`}>
          {phase === 'phase1' && (
            <img src="/src/assets/hands1.png" alt="hands reaching" className="hands-img reveal" />
          )}
          {phase === 'phase2' && (
            <img src="/src/assets/hands2.png" alt="hands bending" className="hands-img bend" />
          )}
          {phase === 'phase3' && (
            <img
              src="/src/assets/hands3.png"
              alt="hands grabbing"
              className="hands-img grab grab-back"
            />
          )}
        </div>
      </div>

      {/* Сам футер */}
      <div className="ritual-footer" onClick={startSequence}>
        <div className="footer-content">
          <h2>Контактна інформація</h2>
          <p>email: someone@hauntings.com</p>
          <p>Follow us. Or don’t. We already follow you.</p>
        </div>
      </div>

      {/* Руки поверх футера — поза всім, але з умовою появи */}
      {phase === 'phase3' && (
        <div className="hands4-overlay">
          <img
            src="/src/assets/hands4.png"
            alt="hands grabbing overlay"
            className="hands-img grab grab-front"
          />
        </div>
      )}
    </div>
  );
};

export default RitualFooter;
