import './loginStud.css'
import React, {useEffect, useState} from "react";
import student from '../pages/media/student.jpg'
import {useNavigate} from "react-router-dom";
import * as actions from '../actions'
import {useSelector,shallowEqual,useDispatch} from 'react-redux'

const logInSelector=state=>state.student.logIn

function Login_Stud(){
    let history=useNavigate();

    const [username, setUsername] = useState(null); 
    const dispatch = useDispatch();

    const [password, setPassword] = useState(null);

    const logIn=useSelector(logInSelector,shallowEqual)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
    return(
        <div className="stud_log">
            <div className="imgs">
           <img src={student} alt="student" className='profile'/>
            </div>
            
                <input id="usernameStud" type="text" placeholder="user identification code"  
            onChange={
                (evt)=>setUsername(evt.target.value)
                    }/>


            <input id="passwordStud" type="password" placeholder="user password"    
            onChange={ (evt)=>setPassword(evt.target.value) }/>

            <button id="btnCheckCredentials" onClick={ async () => {
                 dispatch(actions.studentActions.logIn_STUDENTS(username,password))      
                 // trimite in back end user si parola si primeste inapoi in stare,
                 // in var logIn daca userul e sau nu ok
                 await sleep(200);

            } }>Check credentials</button> 

            <button id="btnAuthStud" onClick={ async ()=>{

                 if (logIn===true) {
                    console.log(logIn);
                    dispatch(actions.studentActions.logIn_refresh())
                    history("/student-page");
               }
                else {
                    console.log(logIn);
                    alert("Nu ati introdus credentialele corecte!")
                }
               
                
               
                }}>Login</button>
            <p><a href="http://localhost:3000/teacher">Go to a Teacher Login Page</a></p>

        </div>
    );
}

export default Login_Stud;