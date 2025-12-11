import { useEffect, useState } from 'react';
import './App.css';

interface TimeResponse {
  datetime: string;
}

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Fetch initial time from API
    fetch(import.meta.env.VITE_API)
      .then((response) => response.json())
      .then((data: TimeResponse) => {
        setCurrentTime(new Date(data.datetime));
      })
      .catch((err) => {
        console.error('Failed to fetch time', err);
        // Fallback to local time if API fails
        setCurrentTime(new Date());
      });

    // Update clock every second
    const intervalId = setInterval(() => {
      setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="clock-container">
      <div className="time">{formatTime(currentTime)}</div>
    </div>
  );
}

export default App;
