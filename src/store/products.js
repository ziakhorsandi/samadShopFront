import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as apiActions from './api';

const slice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    error: '',
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsRequestFail: (products, action) => {
      products.loading = false;
      products.error = action.payload;
    },
    productsReceived: (products, action) => {
      products.list = action.payload;
      products.loading = false;
    },
  },
});

export const {
  productsRequested,
  productsRequestFail,
  productsReceived,
} = slice.actions;
//-------------Action creators-----------

const url = '/products';
export const loadProducts = () =>
  apiActions.apiCallBegan({
    url,
    onStart: productsRequested.type,
    onSucess: productsReceived.type,
    onError: productsRequestFail.type,
  });

//--------------Selector-------------

export const selectAllProducts = (state) => state.entities.products;

// export const getBugsByUser = (userId) =>
//   createSelector(
//     (state) => state.entities.bugs,
//     (bugs) => bugs.list.filter((bug) => bug.user === userId)
//   );

export default slice.reducer;