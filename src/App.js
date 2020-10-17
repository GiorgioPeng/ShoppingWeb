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
import UserInfo from './pages/userInfo'
// 这是这个项目的入口


function App() {
  return (
    <div className="App">
      <Router>
        <Top link={Link}/>
        <Switch>
          <Route path="/" exact component={Index}></Route>
          <Route path="/shoppingcar" component={ShoppingCar} />
          <Route path="/login" component={Login} />
          <Route path="/userinfo" component={UserInfo}/>
          <Redirect to="/"></Redirect>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
