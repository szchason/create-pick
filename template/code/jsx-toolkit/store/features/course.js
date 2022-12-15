import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  'React18',
  'React Router6',
  'Typescript',
  'Webpack',
];

export const counter = createSlice({
  name: 'course',
  initialState,
  reducers: {
    unshiftItem(state, action) {
      state.unshift(action.payload);
    },
    shiftItem(state) {
      state.shift();
    },
  },
});

export const { unshiftItem, shiftItem } = counter.actions;

export default counter.reducer;
