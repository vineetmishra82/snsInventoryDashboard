import React, { useEffect, useState } from "react";
import myStyles from './Home.module.css';
import Helmet from 'react-helmet';
import { IconContext } from "react-icons";
import {GiHamburgerMenu} from 'react-icons/gi'; 
import { MdFactory } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { TbRulerMeasure } from "react-icons/tb";
import { AiFillHome,AiFillFileText } from "react-icons/ai";
import logo from "../assets/images/logo.png";
import TopBar from "../TopBar/TopBar";
import HomeItem from "../Components/HomeItem/HomeItem";
import Sites from "../Components/Sites/Sites"
import TnP from "../Components/TnP/TnP"
import Units from "../Components/Units/Units"
import Requisition from "../Components/Requisition/Requisition"
import * as constants from "../assets/Constants"

const Home = () => {

const[collapsed,setCollapsed] = useState(false);    
const[currentWindow,setCurrentWindow] = useState(0);
const[sites,setSites] = useState([]);
const[tnp,setTnP] = useState([]);


const[requisitions,setRequisitions]= useState([{}]);

useEffect(() => {

    getSites();
    getTnP();
    getRequisitions();
   

},[]);

const getSites = () => {

   try{ 
    console.log(constants.getSites);
   fetch(constants.getSites)
            .then((response) => {
                 console.log(response);
                return response.json();
            })
            .then((myJson) => {
                // console.log(myJson);
                setSites(myJson);
            });
    } catch (e) {
        console.log(e);
    }
};

const getTnP = () => {
    try{ 
        console.log(constants.getTnP);
        fetch(constants.getTnP)
                 .then((response) => {
                      console.log(response);
                     return response.json();
                 })
                 .then((myJson) => {
                     // console.log(myJson);
                     setTnP(myJson);
                 });
         } catch (e) {
             console.log(e);
         }
};


 
const getRequisitions = () => {
    try{ 
        console.log(constants.getRequisitions);
        fetch(constants.getRequisitions)
                 .then((response) => {
                      console.log(response);
                     return response.json();
                 })
                 .then((myJson) => {
                     // console.log(myJson);
                     setRequisitions(myJson);
                 });
         } catch (e) {
             console.log(e);
         }
};


function getSideBarStatus () {

    if(!collapsed)
    return myStyles.sideBarDivNotCollapsed;

    return myStyles.sideBarDivCollapsed;


};    

function CollapseSidebar() {

    setCollapsed(!collapsed);
}

function getIconSize(){

    if(!collapsed)
    return "1em";

    else
    return "1.5em";
}

function getDivClass () {

    if(collapsed)
    return myStyles.DivBoxCollapsed;

    else
    return myStyles.DivBoxExpanded;
}

function getCentreStage() {

    if(currentWindow === 0)
        {
            return (
                <HomeItem sites = {sites} tnp={tnp} requisitions={requisitions} />
            );
        }
        else if(currentWindow === 1)
        {
            return(
                <Sites  sites = {sites} />
            )
        }
        else if(currentWindow === 2)
        {
            return(
                <TnP />
            )
        }
        else if(currentWindow === 3)
        {
            return(
                <Units />
            )
        }
        else if(currentWindow === 4)
        {
            return(
                <Requisition />
            )
        }
        else 
        {
            return(
                <HomeItem />
            )
        }
       

   
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
       <TopBar />            

     
        <div id="sideBar" className={getSideBarStatus()}>
        <div className={getDivClass()} style={{paddingTop : "0px"}} onClick={CollapseSidebar}>
        {!collapsed && <h3 className={myStyles.iconWithtext} style={{marginRight: "10%"}} >SIA </h3>}
        <IconContext.Provider value={{ size : getIconSize()}}>
         <GiHamburgerMenu className={myStyles.iconWithtext}  /> 
         </IconContext.Provider>
        </div>  

         <div  className={getDivClass()} onClick={() => setCurrentWindow(0)} >
        {!collapsed && <h3 className={myStyles.iconWithtext } style={{marginRight: "10%"}} >Home </h3>}
        <IconContext.Provider value={{ size : getIconSize()}}>
         <AiFillHome className={myStyles.iconWithtext}  /> 
         </IconContext.Provider>
        </div>  
            
        <div className={getDivClass()} onClick={() => setCurrentWindow(1)} >
        {!collapsed && <h3 className={myStyles.iconWithtext} >Sites </h3>}
        <IconContext.Provider value={{ size : getIconSize()}}>
         <MdFactory className={myStyles.iconWithtext} /> 
         </IconContext.Provider>
        </div>  

        <div className={getDivClass()} onClick={() => setCurrentWindow(2)} >
        {!collapsed && <h3 className={myStyles.iconWithtext} >T&P </h3>}
        <IconContext.Provider value={{ size : getIconSize()}}>
         <BsTools className={myStyles.iconWithtext} /> 
         </IconContext.Provider>
        </div>  

        <div className={getDivClass()} onClick={() => setCurrentWindow(3)} >
        {!collapsed && <h3 className={myStyles.iconWithtext} >Units </h3>}
        <IconContext.Provider value={{ size : getIconSize()}}>
         <TbRulerMeasure className={myStyles.iconWithtext}  /> 
         </IconContext.Provider>
        </div>  

        <div className={getDivClass()} onClick={() => setCurrentWindow(4)} >
        {!collapsed && <h3 className={myStyles.iconWithtext} >Requisition </h3>}
        <IconContext.Provider value={{ size : getIconSize()}}>
         <AiFillFileText className={myStyles.iconWithtext}  /> 
         </IconContext.Provider>
        </div>   
            
            
        </div>
      

        <div className={myStyles.displayInline}>
        {getCentreStage()}
                </div>
        </>
    )
}

export default Home;