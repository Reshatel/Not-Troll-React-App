import React, { useState, useRef, useEffect } from 'react';
import './DoomButton.css';
import sirenSound from './sfx/siren.mp3';

const DoomButton = () => {
  const [triggered, setTriggered] = useState(false);
  const [messageStage, setMessageStage] = useState(0); 
  const audioRef = useRef(null);

  const handleClick = () => {
    if (triggered) return;
    setTriggered(true);
    setMessageStage(1); 

    document.body.classList.add('shake', 'flash', 'cracked');

    audioRef.current = new Audio('/Not-Troll-React-App/sfx/siren.mp3');
    audioRef.current.loop = true;
    audioRef.current.play();

    setTimeout(() => {
      document.body.classList.remove('shake', 'flash', 'cracked');
      setMessageStage(2); 

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }, 10000);
  };

  return (
    <div className="doom-wrapper">
      <div className="panel">
        <button
          className={`doom-button ${triggered ? 'triggered' : ''}`}
          onClick={handleClick}
          disabled={triggered}
          aria-label="Danger button"
        />
        <div className="warning-label">⚠️ DON`T TOUCH ⚠️</div>
      </div>

      {messageStage === 1 && (
        <div className="doom-message">
          <h2>💀 DESTRUCTION SYSTEM ACTIVATED 💀</h2>
        </div>
      )}

      {messageStage === 2 && (
        <div className="doom-message">
          <h2> This was a test</h2>
          <p>You failed.</p>
          <p><strong>Brilliant.</strong></p>
        </div>
      )}
    </div>
  );
};

export default DoomButton;
