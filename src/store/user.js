import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { createHeader } from './../publicFuncs';

const userLoginInfoFromlocalStorage = localStorage.getItem('userLoginInfo')
  ? JSON.parse(localStorage.getItem('userLoginInfo'))
  : null;

const slice = createSlice({
  name: 'user',
  initialState: {
    userLoginInfo: userLoginInfoFromlocalStorage,
    userDetail: null,
  },
  reducers: {
    userLogedinSuccess: (user, action) => {
      user.userLoginInfo = action.payload;
      localStorage.setItem('userLoginInfo', JSON.stringify(user.userLoginInfo));
    },
    loginRequestFail: (user, action) => {
      //Must change the error message here for specific use
      if (action.payload === 401) {
        user.error = 'موارد معتبر نیست';
      } else {
        user.error = action.payload;
      }
    },
    userLogedOut: (user) => {
      user.userLoginInfo = null;
      localStorage.removeItem('userLoginInfo');
    },
    // userRegisterdSuccess: (user) => {},
    userDetailRequestSuccess: (user, action) => {
      user.userDetail = action.payload;
    },
    userUpdatedSuccess: (user, action) => {
      user.userLoginInfo = action.payload;
      localStorage.setItem('userLoginInfo', JSON.stringify(user.userLoginInfo));
      const { _id, name, email, isAdmin } = action.payload;
      user.userDetail = { _id, name, email, isAdmin };
    },
  },
});

const {
  userLogedinSuccess,
  loginRequestFail,
  // userRegisterdSuccess,
  userDetailRequestSuccess,
  userUpdatedSuccess,
} = slice.actions;
export const { userLogedOut } = slice.actions;
//-------------Action creators-----------
// const createHeader = (token) => {
//   let config = { 'Content-Type': 'application/json' };
//   if (token) {
//     config['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// };
export const login = (email, password) => (dispatch) => {
  const url = '/users/login';
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      headers: createHeader(),
      onSucess: userLogedinSuccess.type,
      onError: loginRequestFail.type,
      data: { email, password },
    })
  );
};

export const register = (name, email, password) => (dispatch) => {
  const url = '/users';
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      headers: createHeader(),
      // onSucess: userRegisterdSuccess.type,
      onSucess: userLogedinSuccess.type,
      data: { name, email, password },
    })
  );
};

export const getUserDetail = (id) => (dispatch, getState) => {
  const { token } = getState().user.userLoginInfo;
  const url = '/users/profile';
  return dispatch(
    apiCallBegan({
      url,
      method: 'GET',
      headers: createHeader(token),
      onSucess: userDetailRequestSuccess.type,
    })
  );
};
export const updateUserProfile = (name, email, password) => (
  dispatch,
  getState
) => {
  const { token } = getState().user.userLoginInfo;
  const url = '/users/profile';
  return dispatch(
    apiCallBegan({
      url,
      method: 'PUT',
      headers: createHeader(token),
      onSucess: userUpdatedSuccess.type,
      data: {
        name,
        email,
        password,
      },
    })
  );
};

//--------------Selector-------------
export const selectUser = (state) => state.user;

export default slice.reducer;
