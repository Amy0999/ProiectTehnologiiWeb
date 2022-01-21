import React, { useEffect,useState } from "react"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import * as action from '../actions'


const idProiectSelectatSelecator=(state)=>state.student.idProiectStudentLogat
const idStudentLogattSelecator=(state)=>state.student.idStudentLogat

const livrabilDeEvaluatLinkSelector=(state)=>state.livrabil.livrabilDeEvaluat
const livrabilIdSelector=(state)=>state.livrabil.livrabilId

function Evaluare_Proiect(){

    const idProiectSelectat = useSelector(idProiectSelectatSelecator,shallowEqual);
    const idStudentLogat = useSelector(idStudentLogattSelecator,shallowEqual);

    const livrabilDeEvaluatLink = useSelector(livrabilDeEvaluatLinkSelector,shallowEqual);
    const livrabilId = useSelector(livrabilIdSelector,shallowEqual);

    const [nota,setNota]=useState(5);
    let dispatch=useDispatch();
 
    useEffect(()=>{
        dispatch(action.livrabilActions.getLivrabilPtEvaluare(idProiectSelectat))
    },[dispatch,idProiectSelectat]);

    function adaugaEvaluare(){
        dispatch(action.livrabilActions.postLivrabilPtEvaluare(idStudentLogat,nota,livrabilId));
    }
    return(
        <div>
            <p>Ai ajuns la evaluare proiect</p>
            <p id="idParagraf" onClick={ () => {
                
                   var a = document.createElement('a');          
                   var link = document.createTextNode("Link Livrabil");

                   a.appendChild(link); 
                
                   a.title = "Link Livrabil"; 
                   a.href = `${livrabilDeEvaluatLink}`;
                   a.style.marginLeft='675px';
                   
                   document.body.append(a); 
                   
                  document.getElementById("idParagraf").style.visibility="hidden";
            }
            }>Aveti de evaluat un proiect! Apasati click pentru a-l vizualiza</p>
        
            <label for id="idNota">Adauga nota</label>
            <input type="number" id="idNota" min="0" max="10" step="0.1"  placeholder="Nota dorita" onChange={(evt)=>setNota(evt.target.value)}></input>
            <input type="button" id="btnAdaugaNota" value="Adauga Nota" onClick={()=>adaugaEvaluare()}></input>

        </div>
        
    )};


export default Evaluare_Proiect;