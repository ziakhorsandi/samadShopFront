import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { createHeader } from './../publicFuncs';
import { shippingAddressRemoved } from './cart';
import { orderReset } from './order';
import { UPDATE_SUCCESS_MSG } from '../messages';

const userLoginInfoFromlocalStorage = localStorage.getItem('userLoginInfo')
  ? JSON.parse(localStorage.getItem('userLoginInfo'))
  : null;

const slice = createSlice({
  name: 'user',
  initialState: {
    userLoginInfo: userLoginInfoFromlocalStorage,
    userDetail: {},
    userList: [],
    error: '',
    message: '',
    loading: false,
  },
  reducers: {
    userErrorReset: (user) => {
      user.error = '';
      user.message = '';
    },
    userLogedinSuccess: (user, action) => {
      user.userLoginInfo = action.payload;
      localStorage.setItem('userLoginInfo', JSON.stringify(user.userLoginInfo));
      user.loading = false;
    },

    publicRequested: (user) => {
      user.error = '';
      user.message = '';
      user.loading = true;
    },
    publicRequestFail: (user, action) => {
      //Must change the error message here for specific use
      if (action.payload === 401 || action.payload === 400) {
        user.error = 'موارد معتبر نیست';
      } else {
        user.error = action.payload;
      }
      user.loading = false;
    },
    userLogedOut: (user) => {
      user.userLoginInfo = null;
      user.userDetail = null;
      user.userList = [];
      localStorage.removeItem('userLoginInfo');
    },
    // userRegisterdSuccess: (user) => {},
    userDetailRequestSuccess: (user, action) => {
      user.userDetail = action.payload;
      user.loading = false;
    },
    userUpdatedSuccess: (user, action) => {
      user.userLoginInfo = action.payload;
      localStorage.setItem('userLoginInfo', JSON.stringify(user.userLoginInfo));
      const { _id, name, email, isAdmin } = action.payload;
      user.userDetail = { _id, name, email, isAdmin };

      user.loading = false;
      user.message = UPDATE_SUCCESS_MSG;
    },
    userListRequestSuccess: (users, action) => {
      users.userList = action.payload;
    },
    deleteUserSuccess: (users, action) => {
      const index = users.userList.findIndex(
        (user) => user.id === action.extraData
      );
      users.userList.splice(index, 1);
    },
    userUpdateFromAdminSuccess: (user, action) => {
      const { _id, name, email, isAdmin } = action.payload;
      user.userDetail = { _id, name, email, isAdmin };

      user.loading = false;
      user.message = UPDATE_SUCCESS_MSG;
    },
    userDetailReset: (user, action) => {
      user.userDetail = {};
    },
  },
});

const {
  userLogedinSuccess,
  // userRegisterdSuccess,
  userDetailRequestSuccess,
  userUpdatedSuccess,
  userLogedOut,
  userListRequestSuccess,
  deleteUserSuccess,
  userUpdateFromAdminSuccess,
  publicRequested,
  publicRequestFail,
  userErrorReset,
} = slice.actions;
export const { userDetailReset } = slice.actions;
//-------------Action creators-----------
export const login = (email, password) => (dispatch) => {
  const url = '/users/login';
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      headers: createHeader(),
      onStart: publicRequested.type,
      onSucess: userLogedinSuccess.type,
      onError: publicRequestFail.type,
      data: { email, password },
    })
  );
};

export const logOut = () => (dispatch) => {
  dispatch(userLogedOut());
  dispatch(shippingAddressRemoved());
  dispatch(orderReset());
};

export const register = (name, email, password) => (dispatch) => {
  const url = '/users';
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      headers: createHeader(),
      // onSucess: userRegisterdSuccess.type,
      onStart: publicRequested.type,
      onSucess: userLogedinSuccess.type,
      onError: publicRequestFail.type,
      data: { name, email, password },
    })
  );
};

export const getUserDetail = (id) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = `/users/${id}`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      headers: createHeader(token),
      onStart: publicRequested.type,
      onSucess: userDetailRequestSuccess.type,
      onError: publicRequestFail.type,
    })
  );
};
export const updateUserProfile =
  (name, email, password) => (dispatch, getState) => {
    const { token } = getState().user.userLoginInfo;
    const url = '/users/profile';
    return dispatch(
      apiCallBegan({
        url,
        method: 'PUT',
        headers: createHeader(token),
        onStart: publicRequested.type,
        onSucess: userUpdatedSuccess.type,
        onError: publicRequestFail.type,
        data: {
          name,
          email,
          password,
        },
      })
    );
  };
export const getUserLists = () => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = '/users';
  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      headers: createHeader(token),
      onSucess: userListRequestSuccess.type,
    })
  );
};
export const deleteUser = (id) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = `/users/${id}`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'DELETE',
      headers: createHeader(token),
      onSucess: deleteUserSuccess.type,
      extraData: id,
    })
  );
};

export const updateUser = (user) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = `/users/${user._id}`;
  return dispatch(
    apiCallBegan({
      url,
      method: 'PUT',
      headers: createHeader(token),
      onStart: publicRequested.type,
      onSucess: userUpdateFromAdminSuccess.type,
      onError: publicRequestFail.type,
      data: user,
    })
  );
};

export const userErrReset = () => {
  return { type: userErrorReset.type };
};

//--------------Selector-------------
export const selectUser = (state) => state.user;

export default slice.reducer;
