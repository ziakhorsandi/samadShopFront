import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import configureStore from './store/configureStore';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreem';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditCreateScreen from './screens/ProductEditCreateScreen';
import OrderListScreen from './screens/OrderListScreen';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Header />
        <Switch>
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/shopcart/:id?' component={CartScreen} />
          <Route path='/users/login' component={LoginScreen} />
          <Route path='/users/register' component={RegisterScreen} />
          <PrivateRoute path='/users/profile' component={ProfileScreen} />
          <PrivateRoute path='/shipping' component={ShippingScreen} />
          <PrivateRoute path='/payment' component={PaymentScreen} />
          <PrivateRoute path='/placeorder' component={PlaceorderScreen} />
          <PrivateRoute path='/order/:id' component={OrderScreen} />
          <PrivateRoute
            path='/admin/users/:id/edit'
            admin
            component={UserEditScreen}
          />
          <PrivateRoute path='/admin/users' admin component={UserListScreen} />

          <PrivateRoute
            path='/admin/products/create'
            admin
            component={ProductEditCreateScreen}
          />
          <PrivateRoute
            path='/admin/products/:id/edit'
            admin
            component={ProductEditCreateScreen}
          />
          <PrivateRoute
            path='/admin/orderlist'
            admin
            component={OrderListScreen}
          />
          <PrivateRoute
            exact
            path='/admin/productlist'
            admin
            component={ProductListScreen}
          />
          <PrivateRoute
            exact
            path='/admin/productlist/:pageNumber'
            admin
            component={ProductListScreen}
          />
          <Route exact path='/search/:keyword' component={HomeScreen} />
          <Route
            exact
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
          />
          <Route exact path='/page/:pageNumber' component={HomeScreen} />
          <Route exact path='/' component={HomeScreen} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
