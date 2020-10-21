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
  const [loginInfo, setLoginInfo] = React.useState(null)
  return (
    <div className="App">
      <Router>
        <Top link={Link} loginInfo={loginInfo} />
        <Switch>
          <Route path="/shoppingweb" exact component={Index}></Route>
          <Route path="/shoppingcar"
            render={() =>
              loginInfo ? (
                <ShoppingCar loginInfo={loginInfo}></ShoppingCar>
              ) : (
                  <Redirect
                    to={{
                      pathname: "/login"
                    }}
                  ></Redirect>
                )
            } />
          <Route path="/login" component={() => (<Login setLoginInfo={setLoginInfo} />)} />
          <Route path="/userinfo"
            render={() =>
              loginInfo ? (
                <UserInfo loginInfo={loginInfo}></UserInfo>
              ) : (
                  <Redirect
                    to={{
                      pathname: "/login"
                    }}
                  ></Redirect>
                )
            } />
          <Route path="/star"
            render={() =>
              loginInfo ? (
                <Star loginInfo={loginInfo}></Star>
              ) : (
                  <Redirect
                    to={{
                      pathname: "/login"
                    }}
                  ></Redirect>
                )
            } />
          <Route path="/shoppingweb/detail/:identify" component={Detail} />
          <Redirect to="/shoppingweb"></Redirect>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
