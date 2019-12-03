import React from 'react';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import {HashRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Admin}/>
        <Route component={Admin}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
