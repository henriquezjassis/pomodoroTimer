import React from 'react';
import Timer from './components/Timer'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <header className="title">
        <h1>Pomodoro Timer</h1>
        {/* <img src={tomatoImg}/> */}
      </header>
      <Timer />
    </div>
  );
}

export default App;
