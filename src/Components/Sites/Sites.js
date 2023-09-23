import React, { useEffect, useState } from "react";
import styles from  "./Sites.module.css";
import * as constants from "../../assets/Constants"

function Sites(props) {

  const[sites, setSites] = useState(props.sites);

 

return(
    <div >
 
 <div className={styles.headerBox}>
   <h1>Site Management</h1>
   </div>

 <div className={styles.allSitesBox}>
    </div>   

    

    </div>
   
)

};

export default Sites;