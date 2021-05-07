import { createSlice } from '@reduxjs/toolkit';
// import { createSelector } from 'reselect';
// import * as apiActions from './api';
import { loadProduct } from './detailProduct';

const cartItemsFromlocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const shippingAddressFromlocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const slice = createSlice({
  name: 'cart',
  initialState: {
    items: cartItemsFromlocalStorage,
    shippingAddress: shippingAddressFromlocalStorage,
  },
  reducers: {
    itemAdded: (cart, action) => {
      const index = cart.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        cart.items.push(action.payload);
      } else {
        cart.items[index].qty = action.payload.qty;
      }
      localStorage.setItem('cartItems', JSON.stringify(cart.items));
    },
    itemDeleted: (cart, action) => {
      const index = cart.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        cart.items.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cart.items));
      }
    },
    shippingAddressAdded: (cart, action) => {
      cart.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    paymentMethodAdded: (cart, action) => {
      cart.paymentMethod = action.payload;
    },
  },
});

const {
  itemAdded,
  itemDeleted,
  shippingAddressAdded,
  paymentMethodAdded,
} = slice.actions;
//-------------Action creators-----------

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let product = getState().entities.detailProduct.list;

  if (product._id && id) {
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
  return dispatch(itemAdded(item));
};
export const delACart = (id) => (dispatch) => {
  return dispatch(itemDeleted(id));
};
export const addShippingAddress = (data) => (dispatch) => {
  return dispatch(shippingAddressAdded(data));
};
export const addPaymentMethod = (data) => (dispatch) => {
  return dispatch(paymentMethodAdded(data));
};
//--------------Selector-------------

export const selectCart = (state) => state.entities.cart.items;
export const selectShippingAddress = (state) =>
  state.entities.cart.shippingAddress;
export const selectPaymentMethod = (state) => state.entities.cart.paymentMethod;

export default slice.reducer;
