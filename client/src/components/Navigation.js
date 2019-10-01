import React, { Component } from "react";
import defaultImage from './../deafultImage.png';

export default class Navigation extends Component {

  openSideBar = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeSideBar = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  render() {
    return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand" onClick={this.openSideBar}>&#9776;</span>
       

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
           
          </ul>
          <div class="form-inline my-2 my-lg-0">
            <img class="rounded-circle" src={defaultImage} alt="default image" width="45px" />
            <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Jhon Does
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Logout
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
               
          </ul>
         </div>
        </div>
      </nav>

      <div id="mySidenav" class="sidenav">
        <span> Disabled</span> <a href="javascript:void(0)" class="closebtn" onClick={this.closeSideBar}>&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>

      </div>
    );
  }
}
