import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
