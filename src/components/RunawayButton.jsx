import React, { useRef, useEffect, useState } from 'react';
import './RunawayButton.css';

const TAUNTS = [
  "So close!",
  "Haha, not this time!",
  "Are you for real?",
  "👀 I saw that.",
  "Try again, smarty 😏",
  "I'm too slick 😎",
];

const SAD_TAUNTS = [
  "What's the point...",
  "😐 I won't even try.",
  "Fine. Click me. Who cares.",
  "I've lost the will to escape...",
];

const CLICK_MESSAGES = [
  "😳 WHAT THE...?!",
  "😵 I wasn't ready for that...",
  "😨 How did you even do that?",
  "🫣 Are you a wizard or something?",
  "🧠 Ctrl + click??? Seriously?",
  "🥲 You're way too fast for me...",
];

const SAD_CLICK_MESSAGES = [
  "😔 Thanks. I guess.",
  "💤 Why bother.",
  "☁️ Nothing matters.",
];

const RunawayButton = () => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [taunt, setTaunt] = useState('');
  const [clickMessage, setClickMessage] = useState('');
  const [escapeCount, setEscapeCount] = useState(0);
  const lastMove = useRef(Date.now());

  useEffect(() => {
    const initPosition = () => {
      if (buttonRef.current) {
        const zone = buttonRef.current.parentElement.getBoundingClientRect();
        const btnWidth = buttonRef.current.offsetWidth;
        const btnHeight = buttonRef.current.offsetHeight;
        const top = (zone.height - btnHeight) / 2;
        const left = (zone.width - btnWidth) / 2;
        setPosition({ top, left });
      }
    };
    requestAnimationFrame(initPosition);
  }, []);

  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastMove.current < 30 || !buttonRef.current) return;
    lastMove.current = now;

    const rect = buttonRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - cx, e.clientY - cy);
    const detectionRadius = window.__depressedLockMood ? 35 : 150;

    if (distance < detectionRadius && !window.__depressedLockMood) {
      const zone = buttonRef.current.parentElement.getBoundingClientRect();
      const btnWidth = buttonRef.current.offsetWidth;
      const btnHeight = buttonRef.current.offsetHeight;

      const maxLeft = zone.width - btnWidth;
      const maxTop = zone.height - btnHeight;

      const newLeft = Math.random() * maxLeft;
      const newTop = Math.random() * maxTop;

      const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
      const clampedTop = Math.max(0, Math.min(newTop, maxTop));

      buttonRef.current.classList.add('disabled');
      setPosition({ top: clampedTop, left: clampedLeft });

      setTimeout(() => {
        buttonRef.current.classList.remove('disabled');
      }, 100);

      setEscapeCount((prev) => {
        const updated = prev + 1;
        if (updated % 3 === 0) {
          const tauntSet = window.__depressedLockMood ? SAD_TAUNTS : TAUNTS;
          const randomTaunt = tauntSet[Math.floor(Math.random() * tauntSet.length)];
          setTaunt(randomTaunt);
          setTimeout(() => setTaunt(''), 3000);
        }
        return updated;
      });
    }
  };

  const handleClick = () => {
    const messageSet = window.__depressedLockMood ? SAD_CLICK_MESSAGES : CLICK_MESSAGES;
    const randomMessage = messageSet[Math.floor(Math.random() * messageSet.length)];
    setClickMessage(randomMessage);
    setTimeout(() => setClickMessage(''), 3000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        className={`runaway-button ${window.__depressedLockMood ? 'depressed' : ''}`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          position: 'absolute',
        }}
        onClick={handleClick}
        tabIndex={-1}
      >
        {window.__depressedLockMood ? '🥱 You can click me...' : '😏 Try to Click Me!'}
      </button>

      {taunt && (
        <div
          className="taunt"
          style={{ top: `${position.top - 50}px`, left: `${position.left}px` }}
        >
          {taunt}
        </div>
      )}

      {clickMessage && (
        <div className="click-message">
          {clickMessage}
        </div>
      )}
    </>
  );
};

export default RunawayButton;
