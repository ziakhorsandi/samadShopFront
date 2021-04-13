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
    productRequested: (detailProduct) => {
      detailProduct.loading = true;
    },
    productRequestFail: (detailProduct, action) => {
      detailProduct.loading = false;
      detailProduct.error = action.payload;
    },
    productReceived: (detailProduct, action) => {
      detailProduct.list = action.payload;
      detailProduct.loading = false;
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
