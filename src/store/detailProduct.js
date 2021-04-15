import { createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';
import * as apiActions from './api';

const slice = createSlice({
  name: 'detailProduct',
  initialState: {
    list: [],
  },
  reducers: {
    productReceived: (detailProduct, action) => {
      detailProduct.list = action.payload;
    },
  },
});
const { productReceived } = slice.actions;
//-------------Action creators-----------

const url = '/products';
export const loadProduct = (id) =>
  apiActions.apiCallBegan({
    url: `${url}/${id}`,
    onSucess: productReceived.type,
  });

//--------------Selector-------------

export const selectDetailProduct = (state) => state.entities.detailProduct;

export default slice.reducer;
