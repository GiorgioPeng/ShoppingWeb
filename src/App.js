import React from 'react';
import './App.css';
import Top from './compents/Top'
// import Index from './pages/index'
import ShoppingCar from './pages/shoppingCart'
// 这是这个项目的入口


function App() {
  return (
    <div className="App">
      <Top/>
      {/* <Index/>   */}
      <ShoppingCar/>
    </div>
  );
}

export default App;
