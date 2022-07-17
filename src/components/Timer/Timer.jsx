import React, { useState, useEffect } from "react";
import styles from './Timer.module.css';

const Timer = () => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [hour, setHour] = useState("00")
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(minuteCounter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
        let computedHour =
          String(hourCounter).length === 1
            ? `0${hourCounter}`
            : hourCounter;
        
        setSecond(computedSecond);
        setMinute(computedMinute);
        setHour(computedHour);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setHour("00");
  }

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        <span className={styles.minute}>{hour}</span>
        <span>:</span>
        <span className={styles.minute}>{minute}</span>
        <span>:</span>
        <span clasName={styles.second}>{second}</span>
      </div>
      <div class={styles.buttons}>
        <button onClick={() => setIsActive(!isActive)} className={styles.start}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={stopTimer} className={styles.reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;