import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import counterSlice from './features/counter';
import course from './features/course';

export default configureStore({
  reducer: {
    counter: counterSlice,
    courseArr: course,
  },
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
