import {React,useState} from "react";
import styles from './Login.module.css';
import TopBar from '../TopBar/TopBar';
import * as constant from "../assets/Constants";
import { useNavigate } from "react-router-dom";

const Login = () => {

    var navigate = useNavigate();

    const[userName,setUserName] = useState("");
    const[password,setPassword] = useState("");
    const[response,setResponse] = useState(null);

    const HideAlert = () => {

        document.getElementById("errorAlert").hidden = true ;
        setResponse(null);

    };

    const HandleLogin = async() => {

      var url = constant.Login+userName+"&password="+password;
      console.log(url);

      try{
        const result = await fetch(url);
        const data = await result.json();
        setResponse(data);
      
      }catch(err)
      {
        console.log("error - "+err);
      }
            
     
      if(response!==null)
      {
        if(response)
        {
          console.log("success as response is "+response);
          navigate('/home');     
        }
        else if(!response){
          console.log("failure as response is "+response);
          document.getElementById("errorAlert").hidden = false ;  
        }
  
      }
     
    };




    return(
        <div id="mainBody">
        <TopBar />
        <div className={styles.loginBox}>
        <label for="userName" className={"block text-sm font-medium leading-6 text-gray-900 "+ styles.userName} >Username</label>  
        <input id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "+ styles.userName}  name="userName" placeholder="User name" type="text" onKeyDown={HideAlert} />
        <label for="password" className={"block text-sm font-medium leading-6 text-gray-900 "+ styles.userName} >Password</label>
        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " + styles.userName} name="password" placeholder="Password" type= "password" onKeyDown={HideAlert} />
        <button onClick={HandleLogin} class={styles.LoginBtn + " bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" }>
  Login
</button>

<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" id="errorAlert" role="alert" hidden="true"  >
  <span class="block sm:inline">Invalid Id or password</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={HideAlert}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>
        </div>
        </div>
    )


};

export default Login;