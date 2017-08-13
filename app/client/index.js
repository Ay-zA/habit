import React from 'react';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '$redux/store/configureStore';
import { Provider } from 'react-redux';
import App from 'containers/App/App';
import './style.scss';

import { getTodos } from '$redux/actions/todo.actions';

const store = configureStore();
store.dispatch(getTodos());
console.log('store: ', store);
const render = Component => {
  renderDOM(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
     </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App/App', () => {
    const NextApp = require('./containers/App/App');
    render(NextApp);
  });
}
