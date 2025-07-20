import React, { useState, useEffect, useRef } from 'react';
import './UITelevision.css';

const SEGMENTS = [
  'WebsiteWeather',
  'SystemRumors',
  'AdBreak',
  'MoodForecast',
];

const SEGMENT_COMPONENTS = {
  WebsiteWeather: ({ clickCount }) => {
    const load = 60 + (clickCount % 40);
    const pressure = Math.floor(Math.random() * 100);
    const rainChance = Math.floor(Math.random() * 80);

    const tickerText = `
      DOM stable at ${load}% |
      UI pressure: ${pressure}Pa |
      Chance of API rain: ${rainChance}% |
      React components fully charged |
      CSS temperature: ${(20 + clickCount % 15)}°C |
      No scroll storms expected |
      JavaScript in the air...
    `;

    return (
      <div className="weather-channel">
        <div className="weather-info">
          <h3>🌤 Website Weather</h3>
          <p><b>DOM Load:</b> {load}%</p>
          <p><b>UI Pressure:</b> {pressure} Pa</p>
          <p><b>API Rain Chance:</b> {rainChance}%</p>
          {rainChance > 60 ? (
            <p>🌧 Potential requests on the horizon...</p>
          ) : load > 80 ? (
            <p>🔥 The site is overheating!</p>
          ) : (
            <p>☀️ All stable. Time to code.</p>
          )}
        </div>

        <div className="weather-ticker">
          <div className="ticker-inner">{tickerText}</div>
        </div>
      </div>
    );
  },

  SystemRumors: () => {
    const RUMORS = [
      '👁 A button has vanished. Rumor says it escaped to the `<footer>`.',
      '🧩 Sidebar component reportedly seen at `z-index: -999`!',
      '📡 Word is: scroll activity is being monitored in the UI...',
      '🕳 Dark mode may be a portal into devTools.',
      '📺 React is allegedly used to transmit messages from the other side...',
    ];

    const [visibleRumor, setVisibleRumor] = useState(RUMORS[0]);

    useEffect(() => {
      const interval = setInterval(() => {
        const next = RUMORS[Math.floor(Math.random() * RUMORS.length)];
        setVisibleRumor(next);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="system-rumors">
        <div className="rumors-glitch">
          <h3>📡 SYSTEM RUMORS</h3>
          <p>{visibleRumor}</p>
        </div>
        <div className="vhs-overlay" />
      </div>
    );
  },

  AdBreak: () => {
    const [bgIndex, setBgIndex] = useState(0);
    const colors = ['#ff00ff', '#ffff00', '#00ffff', '#ff6600'];
    const slogans = [
      '🔥 Get your DOM Cooler today!',
      '🌀 No DOM, no life!',
      '💾 Interface kettle — just 999 clicks!',
      '📼 Made for die-hard HTML geeks!',
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % colors.length);
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div
        className="ad-break"
        style={{
          backgroundColor: colors[bgIndex],
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          color: '#000',
          fontWeight: 'bold',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>📺 Advertising</h2>
        <p style={{ fontSize: '1.1rem' }}>{slogans[bgIndex]}</p>
        <p className="ad-now">👉 Buy Now! 👈</p>
      </div>
    );
  },

  MoodForecast: ({ mood }) => {
    const [internalMood, setInternalMood] = useState(mood);

    useEffect(() => {
      let isMounted = true;
      const timeout = setTimeout(() => {
        if (isMounted) {
          setInternalMood(mood);
        }
      }, 50);
      return () => {
        isMounted = false;
        clearTimeout(timeout);
      };
    }, [mood]);

    const MOOD_MAP = {
      playful: {
        bg: 'linear-gradient(to top, #ffe29f, #ffa3a3)',
        emoji: '😄',
        message: 'Feeling playful. This site is ready for hugs!',
        extra: '🌈 More animations highly encouraged!',
      },
      sarcastic: {
        bg: 'linear-gradient(to top, #444, #111)',
        emoji: '😏',
        message: 'The site pretends not to care… but it definitely does.',
        extra: '☕ Missing a prop or two, huh?',
      },
      mysterious: {
        bg: 'radial-gradient(circle, #220033, #000000)',
        emoji: '🕵️‍♂️',
        message: 'The interface is hiding something important...',
        extra: '🌌 Follow the cursor. It knows things.',
      },
      aggressive: {
        bg: 'radial-gradient(circle, #5e0000, #000)',
        emoji: '💢',
        message: 'Stop clicking! The site is on edge.',
        extra: '⚡ Excessive activity detected. Eruption expected...',
      },
    };

    const moodData = MOOD_MAP[internalMood] || MOOD_MAP.playful;

    return (
      <div className={`mood-forecast ${internalMood}`} style={{ background: moodData.bg }}>
        <div className="mood-content">
          <h3>{moodData.emoji} Mood Forecast</h3>
          <p>{moodData.message}</p>
          <p><i>{moodData.extra}</i></p>
        </div>
      </div>
    );
  },
};

const UITelevision = ({ mood = 'playful', clickCount = 0 }) => {
  const [currentSegment, setCurrentSegment] = useState(SEGMENTS[0]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const triggerSwitch = (segment = null) => {
    setIsSwitching(true);
    setTimeout(() => {
      if (segment) {
        setCurrentSegment(segment);
      } else {
        const nextIndex = (SEGMENTS.indexOf(currentSegment) + 1) % SEGMENTS.length;
        setCurrentSegment(SEGMENTS[nextIndex]);
      }
      setIsSwitching(false);
    }, 700);
  };

  const handleManualSwitch = (segment) => {
    triggerSwitch(segment);
  };

  const CurrentComponent = SEGMENT_COMPONENTS[currentSegment];

  return (
    <div className="tv-wrapper">
      <div className="tv-container">
        <div className="tv-logo">UI-TV™</div>
        <div className="tv-screen">
          {!isOn ? (
            <div className="tv-off">TV off...</div>
          ) : window.__depressedLockMood ? (
            <div className="tv-static">
              <div className="depressed-overlay-text">📡 Signal Lost...</div>
            </div>
          ) : isSwitching ? (
            <div className="tv-static" />
          ) : (
            <CurrentComponent mood={mood} clickCount={clickCount} />
          )}
        </div>
      </div>

      <div className="tv-remote">
        <div className="remote-body">
          <div className="remote-power">
            <button className="power-btn off" onClick={() => setIsOn(false)} title="Power Off" />
            <button className="power-btn on" onClick={() => setIsOn(true)} title="Power On" />
          </div>
          <div className="remote-title">Control panel</div>
          {SEGMENTS.map((seg) => (
            <button
              key={seg}
              className={`remote-btn ${seg === currentSegment ? 'active' : ''}`}
              onClick={() => handleManualSwitch(seg)}
              disabled={!isOn || window.__depressedLockMood}
            >
              {seg.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UITelevision;
