import React from 'react';
import Timer from './components/Timer'
import './styles/App.css'
import tomatoImg from './imgs/tomato.svg'

function App() {
  return (
    <div className="App">
      <header className="title">
        <h1>Pomodoro</h1>
        <img src={tomatoImg}/>
      </header>
      <Timer />
    </div>
  );
}

export default App;
