import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as apiActions from './api';

const slice = createSlice({
  name: 'detailProduct',
  initialState: {
    list: [],
    loading: false,
    error: '',
  },
  reducers: {
    productRequested: (products, action) => {
      products.loading = true;
    },
    productRequestFail: (products, action) => {
      products.loading = false;
      products.error = action.payload;
    },
    productReceived: (products, action) => {
      products.list = action.payload;
      products.loading = false;
    },
  },
});

export const {
  productRequested,
  productRequestFail,
  productReceived,
} = slice.actions;
//-------------Action creators-----------

const url = '/products';
export const loadProduct = (id) =>
  apiActions.apiCallBegan({
    url: `${url}/${id}`,
    onStart: productRequested.type,
    onSucess: productReceived.type,
    onError: productRequestFail.type,
  });

//--------------Selector-------------

export const selectDetailProduct = (state) => state.entities.detailProduct;

export default slice.reducer;
