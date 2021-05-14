import axios from 'axios';

import { apiCallBegan, apiCallSuccess, apiCallFailed } from '../api';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      onStart,
      onSucess,
      onError,
      headers,
      extraData,
      successMessage,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: 'http://localhost:5000/api',
        url,
        method,
        data,
        headers,
        timeout: 50000,
      });

      //Specific success action
      if (onSucess)
        dispatch({
          type: onSucess,
          payload: response.data,
          extraData: extraData,
        });
      //General success action
      dispatch(apiCallSuccess(successMessage));
    } catch (error) {
      //For specific senarios error action
      if (onError) dispatch({ type: onError, payload: error.response.status });
      //General error action
      dispatch(apiCallFailed(error.message));
    }
  };
export default api;
