import React from 'react';
import { Router } from 'react-router-dom'; //BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import App from './components/App';
import configureStore from './redux/configureStore.dev';
import { Provider as ReduxProvider } from 'react-redux';
//import { history } from '../store/history';
import { createBrowserHistory } from 'history';

const store = configureStore();
const history = createBrowserHistory();

render(
  <ReduxProvider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
