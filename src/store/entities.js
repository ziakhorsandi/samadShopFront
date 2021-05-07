import { combineReducers } from 'redux';

import productsReducer from './products';
import detailProductReducer from './detailProduct';
import cartReducer from './cart';
import orderReducer from './order';

export default combineReducers({
  products: productsReducer,
  detailProduct: detailProductReducer,
  cart: cartReducer,
  order: orderReducer,
});
