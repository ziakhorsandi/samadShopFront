import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectUser } from './../store/user';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log(location);
  const { userLoginInfo } = useSelector(selectUser);
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
};

export default PrivateRoute;
