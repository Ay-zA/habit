import React from 'react';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'containers/App/App';
import '../public/style.scss';

const render = Component => {
  renderDOM(
    <AppContainer>
    <Component/>
  </AppContainer>, document.getElementById('app'));
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App/App', () => {
    const NextApp = require('./containers/App/App');
    render(NextApp);
  });
}
