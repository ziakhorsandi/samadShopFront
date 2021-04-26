import { combineReducers } from 'redux';

import entitiesReducer from './entities';
import userReducer from './user';
import apiReducer from './api';

export default combineReducers({
  entities: entitiesReducer,
  user: userReducer,
  api: apiReducer,
});
