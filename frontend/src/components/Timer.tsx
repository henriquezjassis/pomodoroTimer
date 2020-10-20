import React, {Component, useState, useEffect} from 'react';
import useSound from 'use-sound';

import '../styles/Timer.css'


// I used require instead of import 'cause with sounds import doesn't work.
const bleepSFx = require('../sounds/bleep.mp3');

function Timer(){
    // array[0] ==> Min | array[1] ==> Seg
    const shortRest = [5,0];
    const longRest = [15,0];
    const pomodori = [25,0];

    //Create Hooks that will be necessary to implement the timer.
    const [time, setTime] = useState(pomodori); // time[0] --> Minutes ; time[1] --> Seconds
    const [active, setActive] = useState(false);
    const [turn, setTurn] = useState(1);
    const [cyclesCompleted , setCyclesCompleted] = useState(0);

    const [play] = useSound(bleepSFx); // Get function to play the bleep sound

    function updateTime(){
        // Check if the timer has ended
        if( time[0] <= 0 && time[1] <= 0){ 
            setTurn(turn => turn + 1);
            play(); //Play sound
            if(turn >= 8){
                setTurn(1);
                setCyclesCompleted(cyclesCompleted => cyclesCompleted+1);
                setTime(pomodori);
            }
            else if(turn === 7){
                setTime(longRest);
            }
            else if(turn % 2 === 0){
                setTime(pomodori);
            }
            else{
                setTime(shortRest);
            }
        }
        // Check what you have to do with the minutes and seconds.
        else if(time[1] === 0){
            setTime(time => [time[0]-1, 59])
        }
        else{
            setTime(time => [time[0], time[1]-1]);
        }
    }

    // What is inside this function will run every time one of the variables inside de array change.
    useEffect(()=>{
        if(active){
            setTimeout(()=>{
                updateTime();
            }, 1000);
        }
    },[time,active])
    
    // This weird expression just adds a zero to the left if the number is less than 10, just to look like a normal clock.
    return (
        <div>
            <div className="timerDiv">
                <h2>{(time[0] < 10)?`0${time[0]}`:time[0]} : {(time[1] < 10)?`0${time[1]}`:time[1]}</h2>
            </div>
            <div className="turnDiv">
                <div className="turnPomodori">
                    <h6>1</h6>
                </div>
                <div className={`turnRest ${(turn<2)?"deactivate":"activate"}`}>
                    <h6>2</h6>
                </div>
                <div className={`turnPomodori ${(turn<3)?"deactivate":"activate"}`}>
                    <h6>3</h6>
                </div>
                <div className={`turnRest ${(turn<4)?"deactivate":"activate"}`}>
                    <h6>4</h6>
                </div>
                <div className={`turnPomodori ${(turn<5)?"deactivate":"activate"}`}>
                    <h6>5</h6>
                </div>
                <div className={`turnRest ${(turn<6)?"deactivate":"activate"}`}>
                    <h6>6</h6>
                </div>
                <div className={`turnPomodori ${(turn<7)?"deactivate":"activate"}`}>
                    <h6>7</h6>
                </div>
                <div className={`turnRest ${(turn<8)?"deactivate":"activate"}`}>
                    <h6>8</h6>
                </div>
            </div>
            <div className="divButton">
                <button className="button" onClick={() => active?setActive(false):setActive(true)}> {(active)?"STOP":"START"}</button>  
            </div>
        </div>
    )
}

export default Timer;
