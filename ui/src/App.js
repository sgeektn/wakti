import React from 'react';
import Menu from './components/Menu';
import {Route,BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import Api from './components/Api'
import AboutUs from './components/AboutUs'
function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/api" component={Api} />
      <Route exact path="/aboutus" component={AboutUs} />
    </BrowserRouter>
  );
}

export default App;
