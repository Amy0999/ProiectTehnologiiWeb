import React, { useEffect, useState } from "react"
import './incarcareProiect.css'
import {useSelector,shallowEqual,useDispatch} from 'react-redux'
import * as actions from '../actions'



const listaProiecteSelector =state =>state.proiect.proiectList
const listaLivrabileSelector = state => state.livrabil.livrabilList
const idProiectCorespStudentSelector = state => state.student.idProiectStudentLogat

function Incarcare_Proiect(){

    const dispatch = useDispatch()
    const listaProiecte = useSelector(listaProiecteSelector,shallowEqual)
    const listaLivrabile = useSelector(listaLivrabileSelector,shallowEqual)
    const idProiectCorespStudent = useSelector(idProiectCorespStudentSelector,shallowEqual)
    const [idProiectSelectat, setIdProiectSelectat] = useState(idProiectCorespStudent)
    const [idLivrabilSelectat, setIdLivrabilSelectat] =useState(1)
    const [linkLivrabil, setLinkLivrabil] = useState("")

    function displayListProjects(){
        if(listaProiecte!==undefined)
            return listaProiecte.map(e=><option value={e.ProiectId} key={e.ProiectId} onClick={(evt)=> setIdProiectSelectat(e.ProiectId)}>{e.ProiectName}</option>)
        else
            return null
    }

    const [listaLivrabileFiltrate, setListaLivrabileFiltrate] =useState([])
    useEffect(()=>{
        console.log("instra")
        let listLivrabileLocal=[]
        let ok=0
        for(let i in listaLivrabile){
            if(listaLivrabile[i].ProiectId==idProiectSelectat){
                listLivrabileLocal.push(listaLivrabile[i])
                ok=1
            }
        }
        if(ok===1){
            console.log("sunt in if la filtrare")
            setListaLivrabileFiltrate(listLivrabileLocal)
        }
    }, [idProiectSelectat,listaLivrabile])
    function displayListLivrabile(){
        console.log(listaLivrabile)
        console.log(listaLivrabileFiltrate)
        console.log(idProiectCorespStudent)
        if(listaLivrabileFiltrate!==undefined)
            return listaLivrabileFiltrate.map(e=><option value={e.LivrabilId} key={e.LivrabilId} onClick={(evt)=>setIdLivrabilSelectat(e.ProiectId)}>{e.LivrabilName}</option>)
        else
            return null
    }
    

    useEffect(()=>{
         dispatch(actions.proiectActions.populareCbProiecte(idProiectCorespStudent))
         dispatch(actions.livrabilActions.populareCbLivrabile())
    }, [dispatch,idProiectCorespStudent])



    return(
       
        <div>
          
            <p id="par1">Hei! Bine ai venit!</p>
            <p id="par2">Pentru incarcarea proiectului, completeaza urmatoarele campuri:</p>
            <div className="elemente">
                <div className="combobox_proiect">
                    <label for="cb_proiect">Alege un proiect</label>
                    <select id="cb_proiect" onChange={(evt)=> {

                        setIdProiectSelectat(evt.target.value)
                        }
                        }>
                        { displayListProjects() }
                    
                    </select> 
                </div>
                <div className="combobox_livrabil">
                    <label for="cb_livrabil">Alege un livrabil</label>
                    <select id="cb_livrabil" onChange={(evt) => {
                        setIdLivrabilSelectat(evt.target.value)
                    }}>
                        { displayListLivrabile() }
                    </select>
                </div>
                <div className="textbox_link">
                    <label for="tb_link">Link livrabil</label>
                    <input type="text" id="tb_link" placeholder="adauga link" onChange={
                        (evt)=> setLinkLivrabil(evt.target.value)
                    }/>
                </div>
                <div className="butoane">
                    <button id="btnSalveaza" onClick={()=>{
                        dispatch(actions.livrabilActions.updateLivrabil(idProiectSelectat,idLivrabilSelectat,linkLivrabil))
                        alert("Salvat!");
                        }}>Salvare Livrabil</button>
                </div>
            </div>
        </div>
    );
}

export default Incarcare_Proiect;