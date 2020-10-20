import React from 'react';
import {
  HashRouter as Router,
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
import Star from './pages/star'
import Detail from './pages/detail'
// 这是这个项目的入口


function App() {
  return (
    <div className="App">
      <Router>
        <Top link={Link}/>
        <Switch>
          <Route path="/shoppingweb" exact component={Index}></Route>
          <Route path="/shoppingcar" component={ShoppingCar} />
          <Route path="/login" component={Login} />
          <Route path="/userinfo" component={UserInfo}/>
          <Route path="/star" component={Star}/>
          <Route path="/shoppingweb/detail/:identify" component={Detail}/>
          <Redirect to="/shoppingweb"></Redirect>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
