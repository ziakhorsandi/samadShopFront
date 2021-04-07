import './App.css';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route path='/product/:id' component={ProductScreen} />
      </Switch>
    </Router>
  );
}

export default App;
