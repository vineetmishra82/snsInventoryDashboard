import React, { useEffect, useState } from "react";
import styles from './HomeItem.module.css'

function HomeItem(props) {

const[sites,setSites] = useState(props.sites);   
const[inventory,setInventory] = useState([]);
const[requisitions,setRequisitions] = useState([]);


const getActiveSites = () => {
console.log("sites length is "+sites.length);
if(sites.length===0)
return 0;

return -1;

};

const getInventoryValue = () => {

    if(inventory.length === 0)
    return 0;

    else return -1;
};

return(
    <div >
   <div className={styles.headerBox}>
   <h1>Dashboard</h1>
   </div>
   <div className={styles.itemsBox}>
    
    <h2 className={styles.items}>No of Sites :  {sites.length}</h2>

    <h2 className={styles.items}>Active Sites :  {getActiveSites()}</h2>

    <h2 className={styles.items}>Total Inventory Value : Rs. {getInventoryValue()}</h2>
    <h2 className={styles.items}>Total Active Requisitions :  {requisitions.length}</h2>


    
    </div> 

   
    
    </div>
    
)

};

export default HomeItem;