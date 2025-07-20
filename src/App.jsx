import React, { useState } from 'react';
import RunawayButton from './components/RunawayButton';
import HeaderVoice from './components/HeaderVoice';
import UITelevision from './components/UITelevision';
import StrangeConsole from './components/StrangeConsole';
import DoomButton from './components/DoomButton';
import PullDoor from './components/PullDoor';
import RitualFooter from './components/PullDoor';

import './App.css';
import './reactified.css';


function App() {
  // 🧠 Стани настрію та кліків
  const [mood, setMood] = useState('playful');
  const [clickCount, setClickCount] = useState(0);
  const [overrideMessage, setVoiceOverride] = useState(null);

  return (
    <div className="App">
      <HeaderVoice
        mood={mood}
        setMood={setMood}
        clickCount={clickCount}
        setClickCount={setClickCount}
        override={overrideMessage}
      />

      <div
        className="button-zone"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          paddingLeft: '0',
          paddingRight: '0',
          marginTop: '40px',
          minHeight: '500px',
          background: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <RunawayButton />
      </div>


      <div className="television-zone">
        <UITelevision mood={mood} clickCount={clickCount} />
      </div>
      <PullDoor />
      <div className='strange-console'><StrangeConsole /></div>
      <DoomButton />
      {/* <RitualFooter setVoiceOverride={setVoiceOverride} /> */}
    </div>

  );
}

export default App;
