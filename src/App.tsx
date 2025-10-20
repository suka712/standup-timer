import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [attendees, setAttendees] = useState({
    khiem: 1,
    rich: 1,
    truc: 1,
    khoa: 1,
    tienanh: 1,
  });

  type Attendee = keyof typeof attendees;

  const [standingAttendee, setStandingAttendee] = useState<Attendee>();

  const STARTING_MINUTE = 4;
  const [secondsLeft, setSecondsLeft] = useState(STARTING_MINUTE * 60);

  useEffect(() => {
    const decrementTime = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(decrementTime);
  }, [standingAttendee]);

  useEffect(() => {
    if (!standingAttendee) {
      return;
    }

    if (secondsLeft <= 0) {
      setAttendees((prev) => ({
        ...prev,
        [standingAttendee]: prev[standingAttendee] + 1,
      }));
      setSecondsLeft(STARTING_MINUTE * 60);
    }
  });

  const displayMinute = Math.floor(secondsLeft / 60);
  const displaySecond = secondsLeft % 60;
  const displayTime = `${displayMinute}:${displaySecond.toString().padStart(2, "0")}`;

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "10px" }}>
          {Object.entries(attendees).map(([name, value]) => (
            <button
              key={name}
              onClick={() => {
                setStandingAttendee(name as Attendee);
                setSecondsLeft(STARTING_MINUTE * 60);
              }}
            >
              {name}: {value}
            </button>
          ))}
        </div>
        <h3>Countdown timer</h3>
        <div>Standing: {standingAttendee ? standingAttendee : 'none'}</div>
        <div>{displayTime}</div>
      </div>
    </>
  );
}

export default App;
