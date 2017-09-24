import React from 'react';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Root } from './modules/root';
import '../public/style.scss';

const render = Component => {
  renderDOM(
    <AppContainer>
      <Component/>
    </AppContainer>, document.getElementById('app'));
};

render(Root);

if (module.hot) {
  module.hot.accept();

  // module.hot.accept('./modules/root/root', () => {
  //   const NextApp = require('./modules/root/root');
  //   render(NextApp);
  // });
}
