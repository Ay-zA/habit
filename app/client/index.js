import React from 'react';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/_Root';
import '../public/style.scss';

const render = (Component) => {
  renderDOM(
    // eslint-disable-next-line
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./components/_Root', () => {
    const nextRoot = require('./components/_Root');
    render(nextRoot);
  });
}
