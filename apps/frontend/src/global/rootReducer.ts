import { combineReducers } from '@reduxjs/toolkit';
import coreReducer from '@/global/slices/coreSlice';

const rootReducer = combineReducers({
  core: coreReducer,
});

export default rootReducer;
