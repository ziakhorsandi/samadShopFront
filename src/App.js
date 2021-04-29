import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreem';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/shopcart/:id?' component={CartScreen} />
          <Route path='/users/login' component={LoginScreen} />
          <Route path='/users/register' component={RegisterScreen} />
          <Route path='/users/profile' component={ProfileScreen} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
