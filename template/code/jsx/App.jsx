import React from 'react';
import reactLogo from './images/logo.png';
import './App.scss';

function App() {
  return (
    <div styleName="app">
      <div styleName="logo-box">
        <img src={reactLogo} alt="" />
      </div>
      <div styleName="intro">
        React Project
      </div>
    </div>
  );
}

export default App;
