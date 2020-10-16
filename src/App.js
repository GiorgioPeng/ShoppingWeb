import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import './App.css';
import Top from './compents/Top'
import Index from './pages/index'
import ShoppingCar from './pages/shoppingCart'
import Login from './pages/login'
// 这是这个项目的入口


function App() {
  return (
    <div className="App">
      <Router>
        <Top link={Link}/>
        <Switch>
          <Route path="/" exact component={Index}></Route>
          <Route path="/ShoppingCar" component={ShoppingCar} />
          <Route path="/login" component={Login} />
          <Redirect to="/"></Redirect>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
