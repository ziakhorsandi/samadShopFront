import { combineReducers } from 'redux';

import productsReducer from './products';
import detailProductReducer from './detailProduct';

export default combineReducers({
  products: productsReducer,
  detailProduct: detailProductReducer,
});
