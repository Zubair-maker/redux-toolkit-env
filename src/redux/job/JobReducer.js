import { createSlice } from '@reduxjs/toolkit';
import initialState from './State';

export const jobReducer = createSlice({
  name: 'job',
  initialState,
  reducers: {
    jobAction: (state, action) => {
      console.log('in reducer', state, action);
      state.job = { ...state.job, ...action.payload };
    },
  },
});

export const { jobAction } = jobReducer.actions;

export default jobReducer.reducer;
