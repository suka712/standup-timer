import { useState } from 'react';
import './App.css';
import Clock from './Components/Clock';
import Chart from './Components/Chart';

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
      <Clock attendees={attendees} setAttendees={setAttendees} />
      <Chart attendees={attendees} />
    </>
  );
};

export default App;
