import { useState, useEffect } from "react";

const useTimer = (
  delay = 1000,
  startPosition = 0,
  gap = 1,
  whenCountdownEnded = () => {
    return "empty";
  }
) => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [timeoutStamp, setTimeoutStamp] = useState<any>("");

  const incrementTime = () => {
    setTime((prev) => prev + gap);
  };

  const enableTimer = () => {
    const newTimeoutStamp = setTimeout(incrementTime, delay);
    setTimeoutStamp(newTimeoutStamp);
  };

  const startTimer = () => {
    setTimerOn(true);
    enableTimer();
  };

  const stopTimer = () => {
    setTimerOn(false);
    clearTimeout(timeoutStamp);
  };

  const clearTimer = () => {
    stopTimer();
    setTime(startPosition);
  };

  useEffect(() => {
    clearTimer();
  }, [startPosition]);

  useEffect(() => {
    if (timerOn) {
      if (time !== 0) {
        enableTimer();
      }
      if (time === 0) {
        whenCountdownEnded() === "empty" ? stopTimer() : whenCountdownEnded();
      }
    }
  }, [time]);

  return { time, startTimer, clearTimer, stopTimer };
};

export default useTimer;
