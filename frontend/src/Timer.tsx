import React, {Component, useState, useEffect} from 'react';


// interface iProps{
    
// }

// interface iState{
//     min: number;
//     sec: number;
// }

// class Timer extends Component<iProps, iState>{
//     constructor(props: iProps) {
//         super(props);
//         this.state = { min: 0, sec: 0 };
//     }

//     componentDidMount(){
//         this.setState({ min : 25, sec:0})
//     }

//     render(){
//         return <p>Timer:  {this.state.min} : {this.state.sec}</p>
//     }
// }

function Timer(){
    const shortRest = [0,4];
    const longRest = [0,5];
    const pomodori = [0,10];

    const [time, setTime] = useState(pomodori); // time[0] --> Minutes ; time[1] --> Seconds
    const [active, setActive] = useState(false);
    const [turn, setTurn] = useState(1);
    const [cyclesCompleted , setCyclesCompleted] = useState(0);

    function updateTime(){
        // Check if the timer has ended
        if( time[0] <= 0 && time[1] <= 0){ 
            setTurn(turn => turn + 1);
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
            <p>Timer: {(time[0] < 10)?`0${time[0]}`:time[0]} : {(time[1] < 10)?`0${time[1]}`:time[1]} </p>
            Turn : {turn} <br/>
            Cycles Completed : {cyclesCompleted} <br/>
            <button onClick={() => active?setActive(false):setActive(true)}> {(active)?"Stop":"Start"}</button>  
        </div>
    )
}

export default Timer;
