import { createSlice } from '@reduxjs/toolkit';

const coreSlice = createSlice({
  name: 'core',
  initialState: {},
  reducers: {},
});

export const coreActions = coreSlice.actions;
export default coreSlice.reducer;
