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
  const [timeLeft, setTimeLeft] = useState(STARTING_MINUTE * 60 * 1000);

  const [standingAttendee, setStandingAttendee] = useState<Attendee>();

  useEffect(() => {
    if (!standingAttendee) {
      return;
    }

    const decrementTime = setInterval(() => {
      setTimeLeft((prev) => prev - 10);
    }, 10);

    return () => clearInterval(decrementTime);
  }, [standingAttendee]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setAttendees((prev) =>
        prev.map((a) => (a.name === standingAttendee ? { name: a.name, interval: a.interval + 1 } : a))
      );
      new Audio('/interval-over.mp3').play();
      setTimeLeft(STARTING_MINUTE * 60 * 1000);
    }
  });

  const displayMinute = Math.floor(timeLeft / 60000);
  const displaySecond = Math.floor((timeLeft % 60000) / 1000);
  const displayMillisecond = timeLeft % 1000;
  const displayTime = `${displayMinute}:${displaySecond.toString().padStart(2, '0')}:${displayMillisecond
    .toString().slice(0, -1)
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
              setTimeLeft(STARTING_MINUTE * 60 * 1000);
            }}
          ></button>
          {[...attendees].map((a) => (
            <button
              style={a.name === standingAttendee ? { border: '1px solid #747bff' } : {}}
              key={a.name}
              onClick={() => {
                new Audio('/interval-start.mp3').play();
                setStandingAttendee(a.name as Attendee);
                setTimeLeft(STARTING_MINUTE * 60 * 1000);
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
