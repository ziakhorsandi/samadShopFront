import { createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';
// import * as apiActions from './api';
import { loadProduct } from './detailProduct';

const cartItemsFromlocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const slice = createSlice({
  name: 'cart',
  initialState: {
    items: cartItemsFromlocalStorage,
  },
  reducers: {
    cartItemAdded: (cart, action) => {
      let index = -1;
      index = cart.items.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        cart.items.push(action.payload);
      } else {
        ++cart.items[index].qty;
      }
      localStorage.setItem('cartItems', JSON.stringify(cart.items));
    },
  },
});

const { cartItemAdded } = slice.actions;
//-------------Action creators-----------

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let product = getState().entities.detailProduct.list;

  if (product._id) {
    if (product._id !== id) {
      await dispatch(loadProduct(id));
      product = getState().entities.detailProduct.list;
    }
  } else {
    await dispatch(loadProduct(id));
    product = getState().entities.detailProduct.list;
  }
  const { name, price, countInStock, brand, image } = product;
  let item = { id: product._id, name, price, countInStock, brand, image, qty };
  return dispatch(cartItemAdded(item));
};

//--------------Selector-------------

// export const selectDetailProduct = (state) => state.entities.detailProduct;

export default slice.reducer;
