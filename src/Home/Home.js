import React, { useEffect, useState } from "react";
import myStyles from './Home.module.css';
import Helmet from 'react-helmet';



const Home = () => {

const[collapsed,setCollapsed] = useState(false);    

function getSideBarStatus () {

    if(!collapsed)
    return myStyles.sideBarDivNotCollapsed;

    return myStyles.sideBarDivCollapsed;


};    

function CollapseSidebar() {

    setCollapsed(!collapsed);

}


    return(
        <>
        <Helmet>
         
            <body />
                <style>
                    {`                        
                        body{
                            background-color: rgb(254, 254, 246);               
                       
                        }
                    `}
                </style>
            
        </Helmet>
        <div id="sideBar" className={getSideBarStatus()}><p onClick={CollapseSidebar}>Item</p><p>Logo</p></div>
        </>
    )
}

export default Home;