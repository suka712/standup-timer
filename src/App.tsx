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

  const STARTING_MINUTE = 4;
  const [milisecondsLeft, setMilisecondsLeft] = useState(STARTING_MINUTE * 60 * 1000);

  const [standingAttendee, setStandingAttendee] = useState<string>();

  useEffect(() => {
    if (!standingAttendee) {
      return;
    }

    const decrementTime = setInterval(() => {
      setMilisecondsLeft((prev) => prev - 10);
    }, 10);

    return () => clearInterval(decrementTime);
  }, [standingAttendee]);

  useEffect(() => {
    if (milisecondsLeft <= 0) {
      setAttendees((prev) =>
        prev.map((a) => (a.name === standingAttendee ? { name: a.name, interval: a.interval + 1 } : a))
      );
      new Audio('/interval-over.mp3').play();
      setMilisecondsLeft(Math.floor((STARTING_MINUTE * 60 * 1000) / (attendees.find(a => a.name === standingAttendee)!.interval + 1)));
    }
  });

  const displayMinute = Math.floor(milisecondsLeft / 60000);
  const displaySecond = Math.floor((milisecondsLeft % 60000) / 1000);
  const displayMillisecond = milisecondsLeft % 1000;
  const displayTime = `${displayMinute}:${displaySecond.toString().padStart(2, '0')}:${displayMillisecond
    .toString()
    .slice(0, -1)
    .padStart(2, '0')}`;

  return (
    <>
      <div>
        <div style={{ fontSize: '130px', fontWeight: '200', fontFamily: 'Roboto Mono' }}>{displayTime}</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={standingAttendee === undefined ? { border: '1px solid #747bff' } : {}}
            onClick={() => {
              new Audio('/interval-pause.mp3').play();
              setStandingAttendee(undefined);
              setMilisecondsLeft(STARTING_MINUTE * 60 * 1000);
            }}
          ></button>
          {[...attendees].map((a) => (
            <button
              style={a.name === standingAttendee ? { border: '1px solid #747bff' } : {}}
              key={a.name}
              onClick={() => {
                new Audio('/interval-start.mp3').play();
                setStandingAttendee(a.name);
                setMilisecondsLeft(Math.floor((STARTING_MINUTE * 60 * 1000) / a.interval));
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
