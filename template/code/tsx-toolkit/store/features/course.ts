import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState :string[] = [
  'React18',
  'React Router6',
  'Typescript',
  'Webpack',
];

export const counter = createSlice({
  name: 'course',
  initialState,
  reducers: {
    unshiftItem(state :string[], action :PayloadAction<string>) {
      state.unshift(action.payload);
    },
    shiftItem(state) {
      state.shift();
    },
  },
});

export const { unshiftItem, shiftItem } = counter.actions;

export default counter.reducer;
