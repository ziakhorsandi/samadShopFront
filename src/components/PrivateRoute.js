import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectUser } from './../store/user';

const PrivateRoute = ({ component: Component, location, admin, ...rest }) => {
  const { userLoginInfo } = useSelector(selectUser);
  if (!admin) {
    return (
      <Route
        {...rest}
        render={(props) =>
          userLoginInfo ? (
            <Component {...props} />
          ) : (
            <Redirect to={`users/login?redirect=${location.pathname}`} />
          )
        }
      />
    );
  } else if (admin) {
    return (
      <Route
        {...rest}
        render={(props) =>
          userLoginInfo?.isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to={`/`} />
          )
        }
      />
    );
  }
};

export default PrivateRoute;
