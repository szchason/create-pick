import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  increment, decrement, unshiftItem, shiftItem,
} from './store/actions';
import { useAppDispatch, useAppSelector } from './store';
import Routes from './route';
import reactLogo from './images/logo.png';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const { count, title } = useAppSelector((state) => state.counter);
  const courseArr = useAppSelector((state) => state.courseArr);
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
      <div styleName="redux-box">
        <div styleName="title">
          {
            title
          }
        </div>
        <input
          type="button"
          value="+"
          onClick={() => {
            dispatch(increment());
            dispatch(unshiftItem('typescript'));
          }}
        />
        <span>{count}</span>
        <input
          type="button"
          value="-"
          onClick={() => {
            dispatch(decrement());
            dispatch(shiftItem());
          }}
        />
        <div styleName="array-box">
          {
            courseArr.map((item) => <li key={item}>{item}</li>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
