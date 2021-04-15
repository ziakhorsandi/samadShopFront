import { combineReducers } from 'redux';

import productsReducer from './products';
import detailProductReducer from './detailProduct';
import cartReducer from './cart';
import apiReducer from './api';

export default combineReducers({
  products: productsReducer,
  detailProduct: detailProductReducer,
  cart: cartReducer,
  api: apiReducer,
});
