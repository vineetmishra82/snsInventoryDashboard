import React from "react";
import styles from "./isLoading.module.css"
import logoSvg from "../../assets/images/logo.png"

function isLoading() {

return(
    <div className={styles.imgBox}>
     <img className={styles.animateSpinHorizontal} src={logoSvg} alt="Logo" style={{height : '100px'}} />   
    </div>
)    


}

export default isLoading;