import './loginMain.css'
import React from "react";
import {useNavigate} from "react-router-dom";
function Login_Main(){
    let history=useNavigate();
    
    return(
        <div className="main_log">
           <button id="btnLoginStud" onClick={()=>{
                history("/student");
                }}>Login as a student</button>
            <button id="btnLoginTeach" onClick={()=>{
                history("/teacher");
                }}>Login as a teacher</button>
        </div>
    );
}
export default Login_Main;
