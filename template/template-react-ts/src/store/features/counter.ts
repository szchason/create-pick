import { createSlice } from '@reduxjs/toolkit';

interface ICounter {
  count: number;
  title: string;
}

const initialState :ICounter = {
  count: 0,
  title: 'Redux Toolkit Section',
};

export const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = counter.actions;

export default counter.reducer;
