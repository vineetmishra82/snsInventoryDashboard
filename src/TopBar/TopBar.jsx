import React from "react";
import './TopBar.css';
import logo from "../assets/images/logo.png"
import logoSvg from "../assets/images/logo.svg"
import { useNavigate } from "react-router-dom";

const TopBar = () => {

var navigate = useNavigate();

const logoutProcess = () => {

navigate("/");
}  

console.log(logo);
    return(
        

        <nav class="flex items-center justify-between flex-wrap bg-gray-500 p-1 topBar" >
  <div class="flex items-center flex-shrink-0 text-white mr-6">
   
   <img src={logoSvg} height={35} width={55} alt="" />
   
  </div>

    <div>
      <a onClick={logoutProcess} class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 logoutBtn">Logout</a>
    </div>

</nav>
    );
}

export default TopBar;