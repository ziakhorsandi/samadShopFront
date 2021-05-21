import { createSlice } from '@reduxjs/toolkit';
import { UPDATE_SUCCESS_MSG } from '../messages';
import { createHeader } from '../publicFuncs';
import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'products',
  initialState: {
    list: [],
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
      products.list = action.payload;
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
  },
});

const {
  productsReceived,
  productsCreated,
  productDeletedSuccess,
  productDetailReceived,
  updateProductSuccess,
} = slice.actions;
export const { productReset } = slice.actions;

//-------------Action creators-----------

export const loadProducts = () => {
  const url = '/products';
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

export const getProductById = (id) => (dispatch) => {
  const url = `/products/${id}`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      headers: createHeader(),
      onSucess: productDetailReceived.type,
    })
  );
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

//--------------Selector-------------

export const selectAllProducts = (state) => state.entities.products;

export default slice.reducer;
