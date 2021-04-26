import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'api',
  initialState: { loading: false, error: '' },
  reducers: {
    apiCallBegan: (api) => {
      api.loading = true;
    },
    apiCallSuccess: (api) => {
      api.loading = false;
    },
    apiCallFailed: (api, action) => {
      api.loading = false;
      api.error = action.payload;
    },
  },
});

export const { apiCallBegan, apiCallSuccess, apiCallFailed } = slice.actions;
//-------------Action creators-----------

//--------------Selector-------------
export const selectApiValue = (state) => state.api;

export default slice.reducer;
