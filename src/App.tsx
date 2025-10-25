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
  ]);
  
  return (
    <>
      <VolumeButton />
      <Clock attendees={attendees} setAttendees={setAttendees} volumeLevel={1}/>
      <Chart attendees={attendees} />
    </>
  );
};

export default App;
