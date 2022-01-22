import React from "react"
import Axios from 'axios'
import './teacherView.css'
import { useEffect, useState } from 'react'
function View_Teach() {

    const [proiecteList, setProiecteList] = useState([])
    const [livrabileList, setLivrabileList] = useState([])


    useEffect(() => {
        Axios.get('http://localhost:8000/api/proiect').then((response) => {
            setProiecteList(response.data)
        });

    })
    useEffect(() => {
        Axios.get('http://localhost:8000/api/livrabil').then((response) => {
            setLivrabileList(response.data)
        });

    })

    return (
        <>
            <p>Rezultate evaluare proiecte</p>

            {proiecteList.map((val) => {
                return <table key={val.ProiectId}>
                    <caption key={val.ProiectId} style={{fontWeight: 'bold'}}>Proiect: {val.ProiectName}</caption>
                    <thead>
                        <tr key={val.ProiectId}>
                            <th>Denumire Livrabil</th>
                            <th>Nota 1</th>
                            <th>Nota 2</th>
                            <th>Nota 3</th>
                            <th>Nota 4</th>
                            <th>Nota 5</th>
                            <th>Medie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {val.Livrabile.map((v) => {

                            return <tr key={v.LivrabilId} >
                                <td key={v.LivrabilId}>{v.LivrabilName}</td>
                                {livrabileList.map((val2) => {
                                    if (v.LivrabilId === val2.LivrabilId) {
                                        let sum = 0;
                                        
                                        return (<>
                                            {      
                                                val2.Note.map((u) => {
                                                    sum += u.EvaluareLivrabilNota;
                                                    return <>
                                                        <td key={u.EvaluareId}>{u.EvaluareLivrabilNota}</td>
                                                    </>
                                                })

                                            }
                                            <td style={ {fontWeight:'bold' }}>{(sum / val2.Note.length).toFixed(2)}</td>

                                        </>
                                        );

                                    }

                                })
                                }

                            </tr>
                        })}

                    </tbody>
                </table>
            })}
        </>
    );
}

export default View_Teach;