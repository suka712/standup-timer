import { useState } from 'react';
import './App.css';
import Clock from './Components/Clock';
import Chart from './Components/Chart';
import VolumeButton from './Components/VolumeButton';

const App = () => {
  const [attendees, setAttendees] = useState([
    { name: 'khiem', interval: 1 },
    { name: 'khoa', interval: 1 },
    { name: 'truc', interval: 1 },
    { name: 'tienanh', interval: 1 },
    { name: 'rich', interval: 1 },
    { name: 'minhan', interval: 1 },
  ]);
  const [volumeLevel, setVolumeLevel] = useState(0.6);
  
  return (
    <>
      <VolumeButton volumeLevel={volumeLevel} setVolumeLevel={setVolumeLevel}/>
      <Clock attendees={attendees} setAttendees={setAttendees} volumeLevel={volumeLevel}/>
      <Chart attendees={attendees} />
    </>
  );
};

export default App;
