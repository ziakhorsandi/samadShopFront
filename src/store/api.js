import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'api',
  initialState: { loading: false, error: '' },
  reducers: {
    apiCallBegan: (api) => {
      api.loading = true;
      api.error = '';
    },
    apiCallSuccess: (api, action) => {
      api.loading = false;
    },
    apiCallFailed: (api, action) => {
      api.loading = false;
      api.error = action.payload;
    },
    apiReset: (api) => {
      api.loading = false;
      api.error = '';
    },
  },
});

export const { apiCallBegan, apiCallSuccess, apiCallFailed, apiReset } =
  slice.actions;
//-------------Action creators-----------

//--------------Selector-------------
export const selectApiValue = (state) => state.api;

export default slice.reducer;
