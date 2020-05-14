import React from 'react';
import {NavLink} from 'react-router-dom';
import { ReactComponent as Logo } from './Mail.svg';

const showMenu = () => {
  let menuDeroulant=document.getElementById("navcol-1");
  if (!menuDeroulant.classList.contains("show")){
    menuDeroulant.classList.add("show");
  }
  else{
    menuDeroulant.classList.remove("show");
  }
}

function Menu() {
  return (
    <div>
    <nav className="navbar navbar-dark bg-dark navbar-expand-md fixed-top ">
        <div className="container-fluid"><NavLink className="navbar-brand" to="/" ><Logo />WAKTI</NavLink><button onClick={showMenu} className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation"><NavLink className="nav-link active" to="/">Home</NavLink></li>
                    <li className="nav-item" role="presentation"><NavLink className="nav-link" to="/api">Api</NavLink></li>
                    <li className="nav-item" role="presentation"><NavLink className="nav-link" to="/aboutus">About us</NavLink></li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
  );
}

export default Menu;
