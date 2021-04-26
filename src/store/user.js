import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const userInfoFromlocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const slice = createSlice({
  name: 'user',
  initialState: { userInfo: userInfoFromlocalStorage },
  reducers: {
    userLogedinSuccess: (user, action) => {
      user.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(user.userInfo));
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
      user.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

const { userLogedinSuccess, loginRequestFail } = slice.actions;
export const { userLogedOut } = slice.actions;
//-------------Action creators-----------
const url = '/users/login';
export const login = (email, password) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      onSucess: userLogedinSuccess.type,
      onError: loginRequestFail.type,
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    })
  );
};

//--------------Selector-------------
export const selectUserInfo = (state) => state.user;

export default slice.reducer;
