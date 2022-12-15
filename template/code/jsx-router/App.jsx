import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from './route';
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
      <div styleName="link-box">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div styleName="route-box">
        <Routes />
      </div>
    </div>
  );
}

export default App;
