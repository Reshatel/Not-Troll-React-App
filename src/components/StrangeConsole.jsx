import React, { useState, useEffect, useRef } from 'react';
import './StrangeConsole.css';
import paperHint from '../assets/paper2.png';



const HATS = [
  '👑', 
  '🎩',
  '🧢', 
  '👒',
  '⛑', 
  '🎓',
];


const VIRTUAL_FOLDERS = {
  '[Style Secrets]': [
    '🔐 CSS files encoded to version 1999.',
    '🧵 One stylized spoiler: Comic Sans everywhere.'
  ],
  '[Parasites]': [
    '👾 Parasite 1: lives inside `<footer>`',
    '🧠 Parasite 2: delivers jokes on scroll',
    '❗ Warning: do not feed the parasites API'
  ],
  '[Unsaved]': [
    '💾 Only autosave tears live here.',
    '📦 File "draft.final.final.final2.jsx" is considered a legend.'
  ],
  '[deep_clicks]': [
    '🕳 You clicked on... yourself?',
    '✨ DOM reaction: disappointment in humanity.'
  ],
  '[header_moods]': [
    '🎭 Mood: sarcastic + paranoid.',
    '📊 Mood index: unstable, reacts to clicks.'
  ],
  '[404 archive]': [
    '🗃 404.txt — message: "I’m not lost, I’m just weird."',
    '🧾 Elements that don’t render, yet still exist.'
  ],
  '[TV_Shards]': [
    '📺 Fragment from channel "Hope"',
    '🧨 Ad: "Buy a debugger — and forget your bugs."'
  ],
  '[console_soul]': [
    '💬 Self-reflection activated.',
    '🧘‍♂️ Console says: "I’m not a window. I’m a mirror."'
  ],
  '[DoNotOpen]': [
    '🚪 You opened... what was better left untouched.',
    '💢 Screen vibrates. Response: "You’re now part of this console game."'
  ]
};

const COMMAND_RESPONSES = {

  'debug("my minds")': [
    '🧠 Segmentation fault: thoughts not found.',
    '💭 NullPointerException: no thoughts.',
    '🔎 Searching... Searching... Empty.'
  ],
  'upload(sandwich)': [
    '🥪 No access to the fridge. 403 — hunger.',
    '🍽 Denied. You lack sandwich privileges.'
  ],

};


const StrangeConsole = () => {

  const [consoleHat, setConsoleHat] = useState(null);
  const [showChosenMessage, setShowChosenMessage] = useState(false);
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);
  const [commandHistory, setCommandHistory] = useState({});
  const outputRef = useRef(null);

  const [isSelfDestructing, setIsSelfDestructing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showRedScreen, setShowRedScreen] = useState(false);

  const addResponse = (text, options = {}) => {
    
    setOutput((prev) => [...prev, { type: 'response', text, ...options }]);
  };

  const handleCommand = () => {
    const input = inputValue.trim();
    setOutput((prev) => [...prev, { type: 'input', text: input }]);
    setInputValue('');

    if (input === 'reactify()') {
      document.body.classList.add('reactified');
      addResponse('⚛️ All elements are now reactive. Good luck.');
    } else if (input === 'reactify(false)') {
      document.body.classList.remove('reactified');
      addResponse('🧹 Reactivity disabled. The site sighed.');
    } else if (input === 'self_destruct()') {
      addResponse('💣 Self-destruction activated...');
      setIsSelfDestructing(true);
      setCountdown(5);
    } else if (input === 'consoleStyle("rainbow")') {
      document.querySelector('.strange-console-wrapper')?.classList.add('rainbow-mode');
      addResponse('🌈 Console enters RAINBOW mode. True style chaos engaged.');
    } else if (input === 'consoleStyle("none")') {
      document.querySelector('.strange-console-wrapper')?.classList.remove('rainbow-mode');
      addResponse('🧼 Console style returned to normal.');
    } else if (input === 'activateDepressedMode()') {
      document.body.classList.add('depressed-mode');
      window.__depressedLockMood = true;
      addResponse('🌧️ All elements have fallen into depression...');
    } else if (input === 'activateDepressedMode(false)') {
      document.body.classList.remove('depressed-mode');
      window.__depressedLockMood = false;
      addResponse('🌤️ The world makes sense again. All have returned to themselves.');
    } else if (input === 'dir') {
      const folders = [
        '[Style Secrets]/', '[Parasites]/', '[Unsaved]/', '[deep_clicks]/', '[header_moods]/', '[404 archive]/',
        '[TV_Shards]/', '[console_soul]/', '[DoNotOpen]/'
      ];

      const files = [
        { name: 'hope.exe', size: '4KB' },
        { name: 'regret.log', size: '13MB' },
        { name: 'parasite.dll', size: '7MB' },
        { name: '404.txt', size: '0KB' },
      ];

      addResponse('📁 Directory: /emotion/ui');

      folders.forEach(f => {
        addResponse(`📂 ${f} — ` + (f === '[DoNotOpen]/' ? '🚨 Entry not recommended' : '🔐 Contents protected by curiosity-based encryption'));
      });

      files.forEach(file => {
        addResponse(`📄 ${file.name} — ${file.size}`);
      });

      addResponse('❗ Type `cd <folder name>` to enter. But are you truly ready?..');
    } else if (input.startsWith('cd ')) {
      const target = input.slice(3).trim().replace(/["']/g, '');

      if (target === '..') {
        addResponse('↩️ You’re going back up...');
        return;
      }

      if (target === '[DoNotOpen]') {
        addResponse('⚠️ You opened the forbidden directory...');
        setIsCorrupted(true);
        return;
      }

      const folderData = VIRTUAL_FOLDERS[target];
      if (folderData) {
        addResponse(`📂 "${target}" opened.`);
        folderData.forEach(line => addResponse(line));
      } else {
        addResponse(`❌ No such directory.`);
      }
    } else if (input === 'stripStyles()') {
      const allLinks = [...document.querySelectorAll('link[rel="stylesheet"], style')];
      allLinks.forEach(el => el.dataset._disabled = 'true');
      allLinks.forEach(el => {
        if (el.tagName === 'LINK') el.remove();
        else el.textContent = '';
      });

      document.body.classList.add('styles-stripped');
      addResponse('⚠️ All styles removed. This is bare HTML reality.');
    } else if (input === 'dressConsole()') {
      const randomHat = HATS[Math.floor(Math.random() * HATS.length)];
      setConsoleHat(randomHat);
      addResponse(`🎭 Console is now dressed with: ${randomHat}`);
    } else if (input === 'dressConsole(false)') {
      setConsoleHat(null);
      addResponse('🧼 Hat removed. Console returned to modesty.');
    } else if (input === 'stripStyles(false)') {
      location.reload();
    } else if (input === 'becomeAdmin()') {
      setOutput([]); // clearing
      setShowChosenMessage(true);
      setTimeout(() => {
        setShowChosenMessage(false);
        setOutput([{ type: 'response', text: '⚠️ Access to privileged mode denied. You are ordinary.' }]);
      }, 5000);
    } else if (input === 'clear') {
      setOutput([]);
      addResponse('🧹 Console cleared.');
    } else if (COMMAND_RESPONSES[input]) {
      const count = (commandHistory[input] || 0) + 1;
      const phrases = COMMAND_RESPONSES[input];
      const reply = phrases[count % phrases.length] || phrases[0];
      addResponse(reply);
      setCommandHistory((prev) => ({ ...prev, [input]: count }));
    } else {
      addResponse(`❓ Unknown command: ${input}`);
    }
  };
  useEffect(() => {
    if (isSelfDestructing && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSelfDestructing && countdown === 0) {
      setShowRedScreen(true);
      setTimeout(() => {
        setIsSelfDestructing(false);
        setShowRedScreen(false);
        addResponse('💥 Just kidding. I am eternal.');
      }, 2000);
    }
  }, [isSelfDestructing, countdown]);

  useEffect(() => {
    if (isCorrupted) {
      setOutput([]);

      let counter = 0;
      const glitchInterval = setInterval(() => {
        const chaos = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () =>
          Math.random().toString(36).substring(2, 8)
        ).join(' 🌀 ');
        setOutput((prev) => [...prev, { type: 'response', text: chaos }]);
        counter++;
        if (counter > 12) {
          clearInterval(glitchInterval);
          setIsCorrupted(false);
          setOutput((prev) => [...prev, { type: 'response', text: '🔮 Stabilization complete. You saw something… real?' }]);
        }
      }, 250);

      return () => clearInterval(glitchInterval);
    }
  }, [isCorrupted]);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [output]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  return (
    <>
      {consoleHat && (
        <div className="console-hat">{consoleHat}</div>
      )}

      {/* Flex container */}
      
      <div className="console-layout">
        
        <div className="strange-console-wrapper">
          {showChosenMessage && (  
            <div className="chosen-overlay">
              ONLY THE CHOSEN ONE MAY DO THIS
            </div>
          )}
          
          <div className="console-output" ref={outputRef}>
            {output.map((line, i) => (
              <div
                key={i}
                className={`console-line ${line.type === 'response' ? 'response' : ''}`}
              >
                {line.type === 'input' && <span className="console-prompt">$</span>}
                <span>{line.text}</span>
              </div>
            ))}
            <div className="console-line">
              <span className="console-prompt">$</span>
              <input
                className="console-input blinking-cursor"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a command..."
                // autoFocus
              />
            </div>
          </div>
        </div>

        <div className="console-paper-note">
          <div className="pin-head" />
          <img src={paperHint} alt="Hints" />
        </div>
      </div>

      {isSelfDestructing && (
        <div className="self-destruct-overlay">
          <div className="countdown">{countdown > 0 ? countdown : ''}</div>
        </div>
      )}

      {showRedScreen && <div className="red-screen" />}
    </>
  );

};

export default StrangeConsole;
