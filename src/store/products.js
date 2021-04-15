import { createSlice } from '@reduxjs/toolkit';
import * as apiActions from './api';

const slice = createSlice({
  name: 'products',
  initialState: {
    list: [],
  },
  reducers: {
    productsReceived: (products, action) => {
      products.list = action.payload;
    },
  },
});

export const { productsReceived } = slice.actions;
//-------------Action creators-----------

const url = '/products';
export const loadProducts = () =>
  apiActions.apiCallBegan({
    url,
    onSucess: productsReceived.type,
  });

//--------------Selector-------------

export const selectAllProducts = (state) => state.entities.products;

export default slice.reducer;
