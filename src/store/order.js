import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { createHeader } from './../publicFuncs';

const slice = createSlice({
  name: 'user',
  initialState: {
    items: {},
    success: false,
  },
  reducers: {
    orderCreatedSuccess: (order, action) => {
      order.success = true;
      order.items = action.payload;
    },
    orderCreatedFail: (order, action) => {
      order.success = false;
    },
  },
});

const { orderCreatedSuccess, orderCreatedFail } = slice.actions;
//-------------Action creators-----------
export const createOrder = (order) => (dispatch, getState) => {
  const url = '/orders';
  const { token } = getState().user.userLoginInfo;
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      headers: createHeader(token),
      onSucess: orderCreatedSuccess.type,
      onError: orderCreatedFail.type,
      data: order,
    })
  );
};

//--------------Selector-------------
export const selectOrder = (state) => state.entities.order;

export default slice.reducer;
