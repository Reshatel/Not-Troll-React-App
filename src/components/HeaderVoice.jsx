import React, { useEffect, useState, useRef } from 'react';
import './HeaderVoice.css';

const MOODS = ['playful', 'sarcastic', 'mysterious', 'aggressive'];

const PHRASES = {
  playful: {
    mousemove: ["Careful! These pixels are ticklish.", "Oooh, I see you snooping!", "Nice cursor dance 💃", "Are you trying to tickle me?", "You hover like a butterfly 🦋"],
    scroll: ["Wheee! Down we go!", "You're really diving deep, huh?", "Scrolling is healthy. That’s science.", "Scroll therapy session in progress...", "That scroll bar is getting a workout!"],
    click: ["Aha! You clicked me!", "Clicky click! I felt that.", "Pressed with style 🙃", "Is that your love language — clicking?", "You’ve got good click timing!"],
    ambient: ["I'm just here vibing 🎶", "Still watching... always watching.", "Time flies when you're being observed.", "You didn’t forget about me, did you?", "I might be invisible... but I’m judging 😄"]
  },
  sarcastic: {
    mousemove: ["Wow... thrilling cursor adventure.", "You're hovering like a pro... not.", "Still moving the mouse? Fascinating.", "At this rate, you'll circle the Earth.", "Touching pixels never felt so dramatic 🙄"],
    scroll: ["Scrolling... still? Alrighty.", "Oh look, more scrolling. How original.", "If scrolling were a sport, you'd be gold.", "Such depth, such mystery... said no one.", "You're not lost... you're exploring badly."],
    click: ["Oh, you click now? Brave.", "A click? Is that your big move?", "Congratulations! You moved a finger!", "What a bold decision... not really.", "You clicked. The universe did not notice."],
    ambient: ["I'm bored. Entertain me.", "This site is yours, but I'm still the star.", "Nothing happening... shocking.", "Do you even know why you're here?", "Time is passing, unlike your productivity."]
  },
  mysterious: {
    mousemove: ["Each movement leaves a footprint in the void.", "The air pulses with your intent...", "I feel the energy shifting.", "You've disrupted the silence.", "Do you hear the whispers? I do."],
    scroll: ["Descending through digital shadows...", "Depth awaits, but do you?", "The scroll reveals. You must interpret.", "Have you come looking for something lost?", "Nothing hidden stays hidden forever..."],
    click: ["Something stirs beneath the click...", "Did you unlock a secret... or a mistake?", "The portal responds.", "A decision made. Its consequences unknown.", "Echoes ripple out from your touch..."],
    ambient: ["Stillness speaks loudest.", "I wait between your thoughts.", "This silence is... intentional.", "The code breathes.", "You linger, but the shadows move."]
  },
  aggressive: {
    mousemove: ["Do NOT come any closer.", "Back off. Seriously.", "Stop pestering my pixels.💢", "You're triggering my rage levels.", "Every twitch makes me grow stronger 💢"],
    scroll: ["Too far. Turn back.", "You're scraping the underlayer.", "I said no scrolling. You ignored me💢", "Depth won’t help you now.", "The page isn't the only thing unraveling..."],
    click: ["HEY! ENOUGH!", "One more click and I riot!", "Click again — I dare you.", "This is abuse. I'm calling the developer.", "I SAID STOP. DO YOU LISTEN?💢"],
    ambient: ["Still here? You have some nerve.", "I'm fuming silently...", "Peace was never an option.", "I'm counting your mistakes.", "Your presence is exhausting."]
  }
};

const EMOJIS = {
  playful: '😄',
  sarcastic: '🙄',
  mysterious: '😶',
  aggressive: '😡',
};

function HeaderVoice({ mood, setMood, clickCount, setClickCount, overrideMessage }) {
  const [message, setMessage] = useState('...');
  const startTime = useRef(Date.now());
  const cooldownRef = useRef(false);
  const headerRef = useRef(null);
  const isInsideRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.__depressedLockMood && mood !== 'sarcastic') {
        setMood('sarcastic');
      }
    }, 500);
    return () => clearInterval(interval);
  }, [mood]);

  const speak = (type, overrideCooldown = false) => {
    if (type !== 'ambient' && type !== 'scroll' && !isInsideRef.current) return;
    if (cooldownRef.current && !overrideCooldown) return;

    const pool = PHRASES[mood][type];
    if (!pool || pool.length === 0) return;

    const phrase = pool[Math.floor(Math.random() * pool.length)];
    setMessage(phrase);

    if (!overrideCooldown) {
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, 4000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeOnSite = Date.now() - startTime.current;
      if (timeOnSite > 15000) speak('ambient');
    }, 10000);
    return () => clearInterval(interval);
  }, [mood]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleEnter = () => (isInsideRef.current = true);
    const handleLeave = () => (isInsideRef.current = false);
    const handleMouseMove = () => speak('mousemove');
    const handleScroll = () => speak('scroll');

    const handleClick = () => {
      setClickCount((prev) => {
        const updated = prev + 1;
        if (updated >= 21 && mood !== 'aggressive') {
          setMood('aggressive');
          setMessage('HEY! STOP CLICKING!');
          return 0;
        }

        speak('click', true);
        return updated;
      });
    };

    header.addEventListener('mouseenter', handleEnter);
    header.addEventListener('mouseleave', handleLeave);
    header.addEventListener('mousemove', handleMouseMove);
    header.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      header.removeEventListener('mouseenter', handleEnter);
      header.removeEventListener('mouseleave', handleLeave);
      header.removeEventListener('mousemove', handleMouseMove);
      header.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mood]);

  return (
    <div className={`header-voice ${mood}`} ref={headerRef}>
      <div className={`voice-message ${mood}`}>
        {overrideMessage ? overrideMessage : `${EMOJIS[mood]} ${message}`}
      </div>

      <div className="mood-controls">
        {MOODS.map((m) => (
          <button
            key={m}
            className={`mood-button ${m} ${mood === m ? 'active' : ''}`}
            onClick={() => {
              if (window.__depressedLockMood) return;
              setMood(m);
              setClickCount(0);
            }}
            disabled={window.__depressedLockMood}
          >
            {EMOJIS[m]} {m}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HeaderVoice;
