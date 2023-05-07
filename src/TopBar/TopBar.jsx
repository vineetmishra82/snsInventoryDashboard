import React from "react";
import './TopBar.css';
import logo from "../assets/images/logo.png"

const TopBar = () => {
console.log(logo);
    return(
        <div id="topBar"> 
        <img src={logo} alt="SIA" id="logo" />        
        </div>
    );
}

export default TopBar;