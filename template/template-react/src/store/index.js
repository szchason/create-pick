import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from './features/counter';

export default configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
