import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import Friends from './components/Friends';
import PrivateRoute from './components/PrivateRoute';
import AddFriendForm from './components/AddFriendForm';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lambda Friends</h1>
      
      <Route exact path="/" render={props => 
        <Login {...props} />
      } />

      <PrivateRoute exact path="/friends" component={Friends} />

      <PrivateRoute exact path="/add-friend" component={AddFriendForm} />
    </div>
  );
}

export default App;
