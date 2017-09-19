import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Todos, About } from '..';

const Main = () => <main className="container">
  <Switch>
    <Route exact path='/' component={Todos}/>
    <Route path='/todos' component={Todos}/>
    <Route path='/about' component={About}/>
  </Switch>
</main>;

export default Main;
