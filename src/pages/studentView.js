import './studentView.css'
import React from "react";
import {useNavigate} from "react-router-dom";
function Student_View(){
    let history=useNavigate();
    
    return(
        <div className="stud_view">
            <button id="btnIncarca" onClick={()=>{
                history("/student-incarcare-proiect");
                }}>Creare Proiect</button>
           <button id="btnIncarca" onClick={()=>{
                history("/student-incarcare-proiect");
                }}>Incarcare Proiect</button>
            <button id="btnEvalueaza" onClick={()=>{
                history("/student-evaluare-proiect");
                }}>Evaluare Proiect</button>
        </div>
    );
}
export default Student_View;