import React from "react"
import './loginTeach.css'
import teacher from '../pages/media/teacher.jpg'
import {useNavigate} from "react-router-dom";
function Login_Teach(){
    let history=useNavigate();
   
    return(
        
        <div className="teach_log">
            <div className="imgs">
           <img src={teacher} alt="teacher" className='profile'/>
            </div>
            <input id="passwordTeach" type="password" placeholder="identification code"/>
            <button id="btnAuthTeacher" onClick={()=>{
                let teacherCode = document.querySelector('#passwordTeach').value;
                if(teacherCode === "1234"){
                    history("/teacher-page");
                }else{
                    alert('Invalid access code!');
                }

                }}>Login</button>
            <p><a href="http://localhost:3000/student">Go to a Student Login Page</a></p>
        </div>
    );
}

export default Login_Teach;