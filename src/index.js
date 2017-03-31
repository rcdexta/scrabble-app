import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';
import Form from './Form';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Form}/>
    <Route path="/:id" component={Grid}/>
  </Router>,
  document.getElementById('root')
);
