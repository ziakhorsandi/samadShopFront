import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { createHeader } from './../publicFuncs';

const slice = createSlice({
  name: 'user',
  initialState: {
    detail: {},
    allOrders: [],
    success: false,
  },
  reducers: {
    orderCreatedSuccess: (order, action) => {
      order.success = true;
      order.detail = action.payload;
    },
    orderCreatedFail: (order, action) => {
      order.success = false;
    },
    ordersReceived: (order, action) => {
      order.detail = action.payload;
    },
    orderPayed: (order, action) => {
      order.detail = action.payload;
    },
    allOrdersReceived: (order, action) => {
      order.allOrders = action.payload;
    },
    orderReset: (order) => {
      order.detail = {};
      order.allOrders = [];
      order.success = false;
    },
  },
});

const {
  orderCreatedSuccess,
  orderCreatedFail,
  ordersReceived,
  orderPayed,
  allOrdersReceived,
} = slice.actions;
export const { orderReset } = slice.actions;
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

export const getOrderById = (id) => (dispatch, getState) => {
  const url = `/orders/${id}`;
  const { token } = getState().user.userLoginInfo;
  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      headers: createHeader(token),
      onSucess: ordersReceived.type,
    })
  );
};

export const payOrder = (id, paymentResult) => (dispatch, getState) => {
  const url = `/orders/${id}/pay`;
  const { token } = getState().user.userLoginInfo;
  return dispatch(
    apiCallBegan({
      url,
      method: 'PUT',
      headers: createHeader(token),
      onSucess: orderPayed.type,
      data: paymentResult,
    })
  );
};
export const getAllOrders = () => (dispatch, getState) => {
  const url = `/orders/myorders`;
  const { token } = getState().user.userLoginInfo;
  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      headers: createHeader(token),
      onSucess: allOrdersReceived.type,
    })
  );
};

//--------------Selector-------------
export const selectOrder = (state) => state.entities.order;

export default slice.reducer;
