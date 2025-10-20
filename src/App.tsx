import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [attendees, setAttendees] = useState({
    khiem: 1,
    rich: 1,
    truc: 1,
    khoa: 1,
    "tien anh": 1,
  });
  type Attendee = keyof typeof attendees;
  const [standingAttendee, setStandingAttendee] = useState<Attendee>("khiem");

  const startingMinute = 1;
  const [secondsLeft, setSecondsLeft] = useState(startingMinute * 60);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timerInterval);
          attendees[standingAttendee]++;
          console.log(attendees[standingAttendee]);
          return 0;
        }
        return prev - 1;
      });
    }, 100);

    return () => clearInterval(timerInterval);
  }, []);

  const displaySecond = secondsLeft % 60;
  const displayMinute = Math.floor(secondsLeft / 60);
  const displayTime = `${displayMinute}:${
    displaySecond === 0 ? "00" : displaySecond <= 9 ? "0" + displaySecond : displaySecond
  }`;

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: "10px" }}>
          {Object.entries(attendees).map(([name, value]) => (
            <button key={name}>
              {name}: {value}
            </button>
          ))}
        </div>
        <h3>Countdown timer</h3>
        <div>At the stand: {standingAttendee}</div>
        <div>{displayTime}</div>
      </div>
    </>
  );
}

export default App;
