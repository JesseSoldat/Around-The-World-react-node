import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import configureStore from './store/configureStore';
import AppRouter, {history} from './router/AppRouter';

const LoadingPage = () => (<div>Loading...</div>);

const store = configureStore();

const dom = document.getElementById('root');

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let appHasRenderedOnce = false;

const renderApp = () => {
  if(!appHasRenderedOnce) {
    ReactDOM.render(jsx, dom);
    appHasRenderedOnce = true;
  }
}

ReactDOM.render(<LoadingPage/>, dom);

const user = JSON.parse(localStorage.getItem('user'));

if(user) {
  store.dispatch(login(user._id, user.token));
  renderApp();
} else {
  renderApp();
}

registerServiceWorker();
