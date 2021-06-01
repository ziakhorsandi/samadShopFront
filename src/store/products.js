import { createSlice } from '@reduxjs/toolkit';
import { REVIEW_ADDED, UPDATE_SUCCESS_MSG } from '../messages';
import { createHeader } from '../publicFuncs';
import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    topRated: [],
    detail: {},
    createSuccess: false,
  },
  reducers: {
    updateProductSuccess: (products, action) => {
      products.detail = action.payload;
    },
    productReset: (products) => {
      products.list = [];
      products.createSuccess = false;
    },
    productsReceived: (products, action) => {
      products.list = action.payload.product;
      products.page = action.payload.page;
      products.pages = action.payload.pages;
    },

    productsCreated: (products, action) => {
      products.list.push(action.payload);
      products.detail = action.payload;
      products.createSuccess = true;
    },
    productDeletedSuccess: (products, action) => {
      const index = products.list.findIndex(
        (user) => user.id === action.extraData
      );
      products.list.splice(index, 1);
    },
    productDetailReceived: (products, action) => {
      products.detail = action.payload;
    },
    reviewAddedSuccess: (products, action) => {
      products.detail = action.payload;
    },
    topRatedRecieved: (products, action) => {
      products.topRated = action.payload;
    },
  },
});

const {
  productsReceived,
  productsCreated,
  productDeletedSuccess,
  productDetailReceived,
  updateProductSuccess,
  reviewAddedSuccess,
  topRatedRecieved,
} = slice.actions;
export const { productReset } = slice.actions;

//-------------Action creators-----------

export const loadProducts = (keyword = '', pageNumber = '') => {
  const url = `/products?keyword=${keyword}&pageNumber=${pageNumber}`;
  return apiCallBegan({
    url,
    onSucess: productsReceived.type,
  });
};

export const loadProductDetail = (id) => {
  const url = '/products';
  return apiCallBegan({
    url: `${url}/${id}`,
    onSucess: productDetailReceived.type,
  });
};
export const deleteProduct = (id) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = `/products/${id}`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'DELETE',
      headers: createHeader(token),
      onSucess: productDeletedSuccess.type,
      extraData: id,
    })
  );
};

export const getProductById = (id) => {
  const url = `/products/${id}`;
  return apiCallBegan({
    url,
    method: 'GET',
    headers: createHeader(),
    onSucess: productDetailReceived.type,
  });
};
export const getTopRatedProducts = () => {
  const url = `/products/top`;
  return apiCallBegan({
    url,
    method: 'GET',
    headers: createHeader(),
    onSucess: topRatedRecieved.type,
  });
};

export const createProduct = (data) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = `/products`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      headers: createHeader(token, true),
      onSucess: productsCreated.type,
      data,
    })
  );
};

export const updateProduct = (id, data) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = `/products/${id}`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'PUT',
      headers: createHeader(token, true),
      onSucess: updateProductSuccess.type,
      successMessage: UPDATE_SUCCESS_MSG,
      data,
    })
  );
};
export const setReview = (id, data) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = `/products/${id}/reviews`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      headers: createHeader(token),
      onSucess: reviewAddedSuccess.type,
      successMessage: REVIEW_ADDED,
      data,
    })
  );
};

//--------------Selector-------------

export const selectAllProducts = (state) => state.entities.products;

export default slice.reducer;
