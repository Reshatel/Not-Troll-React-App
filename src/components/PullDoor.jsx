import React, { useState, useRef, useEffect } from 'react';
import './PullDoor.css';

const MESSAGES = [
  "Someone's here...",
  "This isn't your territory.",
  "Just a bit more — and they'll notice you.",
  "Your cursor is dragging more than just an arrow.",
  "This space has a will of its own.",
  "Not the time. Not the place.",
  "Turn back while you still can.",
  "You're crossing the boundary.",
];


const PullDoor = () => {
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [comment, setComment] = useState('');
  const ref = useRef(null);
  const maxPull = 440;

  const handlePointerDown = (e) => {
    setDragging(true);
    ref.current.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    if (!dragging || pull === 0) return;

    setDragging(false);
    setPull(0);

    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setComment(`${msg}`);
    setTimeout(() => setComment(''), 2000);
  };


  const handlePointerMove = (e) => {
    if (!dragging) return;
    const left = ref.current.getBoundingClientRect().left;
    const delta = e.clientX - left;
    const raw = Math.min(delta, maxPull + 100);
    const resistance = 1 - Math.min(raw / maxPull, 1) * 0.3;
    const actual = raw * resistance;

    setPull(actual);
  };

  useEffect(() => {
    if (pull >= maxPull) {
      const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      // setComment(`⛔ ${msg}`);
      setTimeout(() => {
        setPull(0);
        setComment('');
        setDragging(false);
      }, 2000);
    }

  }, [pull]);

  return (
    <div
      className="pull-wrapper"
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <div className="dark-side" style={{ width: `${pull}px` }}>
        <div className="grip-arrow"  style={{ transform: 'translateY(-50%)' }}></div>

        <div
          className="eyes-layer"
          style={{
            opacity: pull >= maxPull / 2 ? pull / maxPull : 0,
            transform: pull > maxPull * 0.8 ? 'scale(1.2)' : 'scale(1)',
            // color: pull > maxPull * 0.8 ? '#ff2222' : '#ff0000',
            // animation: pull >= maxPull / 2
            //   ? 'eyeGlow 2.5s infinite ease-in-out, eyeBlink 3s infinite ease-in-out'
            //   : 'none'
          }}
        >
          👁️ 👁️
        </div>
      </div>


      {comment && (
        <div className="floating-comment">
          {comment}
        </div>
      )}
    </div>
  );
};

export default PullDoor;
