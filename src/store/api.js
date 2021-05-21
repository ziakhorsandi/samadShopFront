import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'api',
  initialState: { loading: false, error: '', message: '' },
  reducers: {
    apiCallBegan: (api) => {
      api.loading = true;
      api.error = '';
      api.message = '';
    },
    apiCallSuccess: (api, action) => {
      api.loading = false;
      api.message = action.payload;
    },
    apiCallFailed: (api, action) => {
      api.loading = false;
      api.error = action.payload;
    },
    apiReset: (api) => {
      api.loading = false;
      api.error = '';
      api.message = '';
    },
  },
});

export const { apiCallBegan, apiCallSuccess, apiCallFailed, apiReset } =
  slice.actions;
//-------------Action creators-----------

//--------------Selector-------------
export const selectApiValue = (state) => state.api;

export default slice.reducer;
