import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [attendees, setAttendees] = useState([
    { name: 'khiem', interval: 1 },
    { name: 'khoa', interval: 1 },
    { name: 'truc', interval: 1 },
    { name: 'tienanh', interval: 1 },
    { name: 'rich', interval: 1 },
  ]);

  type Attendee = keyof typeof attendees;

  const STARTING_MINUTE = 1;
  const [secondsLeft, setSecondsLeft] = useState(STARTING_MINUTE * 60);

  const [standingAttendee, setStandingAttendee] = useState<Attendee>();

  useEffect(() => {
    if (!standingAttendee) {
      return;
    }

    const decrementTime = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 100);

    return () => clearInterval(decrementTime);
  }, [standingAttendee]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setAttendees((prev) =>
        prev.map((a) => (a.name === standingAttendee ? { name: a.name, interval: a.interval + 1 } : a))
      );
      new Audio('/interval-over.mp3').play();
      setSecondsLeft(STARTING_MINUTE * 60);
    }
  });

  const displayMinute = Math.floor(secondsLeft / 60);
  const displaySecond = secondsLeft % 60;
  const displayTime = `${displayMinute}:${displaySecond.toString().padStart(2, '0')}`;

  return (
    <>
      <div>
        <div style={{fontSize: '180px', fontWeight: 'lighter'}}>{displayTime}</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={standingAttendee === undefined ? {border: '1px solid #747bff'} : {}}
            onClick={() => {
              new Audio('/interval-pause.mp3').play();
              setStandingAttendee(undefined);
              setSecondsLeft(STARTING_MINUTE * 60);
            }}
          ></button>
          {[...attendees].map((a) => (
            <button
              style={a.name === standingAttendee ? { border: '1px solid #747bff' } : {}}
              key={a.name}
              onClick={() => {
                new Audio('/interval-start.mp3').play();
                setStandingAttendee(a.name as Attendee);
                setSecondsLeft(STARTING_MINUTE * 60);
              }}
            >
              {a.name}: {a.interval}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
