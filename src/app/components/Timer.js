import React, { useState, useEffect, useRef } from 'react'
import './../css/timer.css'
import './../css/main.css'
const alarm = new Audio('./../audio/alarm.mp3');



const Timer = () => {

  const [isActive, setIsActive] = useState(false);
  ///
  const [isPaused, setIsPaused] = useState(false)
  const [timer, setTimer] = useState(0)
  const [endTime, setEndTime] = useState('')
  const countRef = useRef(null)


  function displayCurrentTime() {
    const now = Date.now()
    const currentTime = new Date(now)
    const currentHour = currentTime.getHours()
    const currentMinutes = currentTime.getMinutes()

    console.log(currentHour)
    console.log(currentMinutes)
    console.log()
  }

  function displayEndTime(timestamp) {
    const now = Date.now();
    const finishTime = new Date(now + timestamp * 1000);
    const finishHour = finishTime.getHours();
    const finishMinutes = finishTime.getMinutes();
    setEndTime(`Ends At ${finishHour}:${finishMinutes < 10 ? '0' : ''}${finishMinutes}`)
  }

  const setTimerStartValue = (timeValue) => {
    setTimer(timeValue)
    formatTime()
  }


  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    // const getMinutes = `0${minutes % 60}`.slice(-2)
    // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${minutes} : ${getSeconds}`
  }

  const handleStart = () => {

    displayEndTime(timer)
    let breakValue = timer
    if (breakValue !== 0) {
      setIsActive(true)
      setIsPaused(false)
    }
    countRef.current = setInterval(() => {
      breakValue = --breakValue
      setTimer((timer) => timer - 1)
      if (breakValue <= 0) {
        handleReset()
        alarm.play()
      }
    }, 1000)

  }

  const handlePause = () => {
    console.log(alarm)
    alarm.play()
    clearInterval(countRef.current)
    setIsPaused(true)
    setIsActive(false)
  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {

      setTimer((timer) => timer + 1)

    }, 1000)
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
    setEndTime('Ready to begin!')
  }

  return (
    <div className="main">
      <div className="time-container">
        {isActive ? <p className={`time-animation`}>
        </p> : <p className={`time-animation-stop`}></p>}

        <div className="time-value">
          {/* {minutes}:{seconds} */}
          <p>{formatTime()}</p>
        </div>
      </div>
      <div className='display__end-time'>
        {isActive||isPaused ? endTime : 'Ready to begin!'}
      </div>
      <div className="row">
        <button className="button" onClick={e => setTimerStartValue(1500)} disabled={isActive}>
          {/* {isActive ? 'Pause' : 'Start'} */}
          pomodoro
        </button>
        <button className="button" onClick={e => setTimerStartValue(5)} disabled={isActive}>
          short break
        </button>
        <button className="button" onClick={e => setTimerStartValue(900)} disabled={isActive}>
          long break
        </button>
        <button className="button" onClick={e => setTimerStartValue(2700)} disabled={isActive}>
          extended
        </button>
      </div>
      <div className="row">
        <button className="button start" onClick={handleStart} disabled={isActive}>
          >
        </button>
        <button className="button pause" onClick={handlePause}>
          | |
        </button>
        <button className="button reset" onClick={handleReset}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Timer;