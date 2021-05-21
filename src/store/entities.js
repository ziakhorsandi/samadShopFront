import { combineReducers } from 'redux';

import productsReducer from './products';
import cartReducer from './cart';
import orderReducer from './order';

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
});
