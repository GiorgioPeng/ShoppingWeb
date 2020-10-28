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
import Register from './pages/register'
import ChangePassword from './pages/changePassword'
// 这是这个项目的入口


function App() {
  const [loginInfo, setLoginInfo] = React.useState(null)

  const [itemData, setItemData] = React.useState([])

  React.useEffect(() => {
    console.log(loginInfo)
  }, [loginInfo])

  return (
    <div className="App">
      <Router>
        <Top link={Link} setItemData={setItemData} loginInfo={loginInfo} />
        <Switch>
          <Route path="/shoppingweb" exact
            render={() =>
              <Index itemData={itemData} loginInfo={loginInfo} setItemData={setItemData}></Index>
            }
          ></Route>
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
          <Route path="/changepassword"
            render={() =>
              loginInfo ? (
                <ChangePassword loginInfo={loginInfo}></ChangePassword>
              ) : (
                  <Redirect
                    to={{
                      pathname: "/login"
                    }}
                  ></Redirect>
                )
            } />
          <Route path="/login" component={() => (<Login setLoginInfo={setLoginInfo} />)} />
          <Route path="/register" component={() => (<Register setLoginInfo={setLoginInfo} />)} />
          <Route path="/shoppingweb/detail/:identify" component={Detail} />
          <Redirect to="/shoppingweb"></Redirect>
        </Switch>

      </Router>
    </div >
  );
}

export default App;
