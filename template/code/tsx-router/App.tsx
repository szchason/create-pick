import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactRoute from './route';
import reactLogo from './images/logo.png';
import './App.scss';

const App :React.FC = () => (
  <div styleName="app">
    <div styleName="logo-box">
      <img src={reactLogo} alt="" />
    </div>
    <div styleName="intro">
      React Project
    </div>
    <div styleName="link-box">
      <NavLink to='/' end>Home</NavLink>
      <NavLink to='/about'>About</NavLink>
    </div>
    <div styleName="route-box">
      <ReactRoute />
    </div>
  </div>
);
export default App;
