import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { createHeader } from './../publicFuncs';

const slice = createSlice({
  name: 'order',
  initialState: {
    detail: {},
    allOrders: [],
    success: false,
    message: '',
    error: '',
    loading: false,
  },
  reducers: {
    publicRequested: (order) => {
      order.error = '';
      order.message = '';
      order.loading = true;
    },
    publicRequestFail: (order, action) => {
      //Must change the error message here for specific use
      order.error = action.payload;
      order.loading = false;
    },
    orderCreatedSuccess: (order, action) => {
      order.success = true;
      order.detail = action.payload;
    },
    orderCreatedFail: (order, action) => {
      order.success = false;
    },
    orderReceived: (order, action) => {
      order.detail = action.payload;
    },
    allOrdersReceived: (order, action) => {
      order.allOrders = action.payload;
      order.loading = false;
    },
    orderReset: (order) => {
      order.detail = {};
      order.allOrders = [];
      order.success = false;
    },
  },
});

const {
  publicRequested,
  publicRequestFail,
  orderCreatedSuccess,
  orderCreatedFail,
  orderReceived,
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
      onSucess: orderReceived.type,
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
      onSucess: orderReceived.type,
      data: paymentResult,
    })
  );
};

export const deliverOrder = (id) => (dispatch, getState) => {
  const url = `/orders/${id}/deliver`;
  const { token } = getState().user.userLoginInfo;
  return dispatch(
    apiCallBegan({
      url,
      method: 'PUT',
      headers: createHeader(token),
      onSucess: orderReceived.type,
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
      onStart: publicRequested.type,
      onSucess: allOrdersReceived.type,
      onError: publicRequestFail.type,
    })
  );
};
export const getAllOrdersFromAllUsers = () => (dispatch, getState) => {
  const url = `/orders`;
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
