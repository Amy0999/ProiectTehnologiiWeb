import React from "react"


function Evaluare_Proiect(){
    return(
        <div>
            <p>Ai ajuns la evaluare proiect</p>
            <p id="idParagraf" onClick={ () => {
                
                   var a = document.createElement('a');          
                   var link = document.createTextNode("Link Livrabil");

                   a.appendChild(link); 
                
                   a.title = "Link Livrabil"; 
                   a.href = "https://www.geeksforgeeks.org";
                   a.style.marginLeft='675px';
                   
                   document.body.append(a); 
                   
                  document.getElementById("idParagraf").style.visibility="hidden";
            }
            }>Aveti de evaluat un proiect! Apasati click pentru a-l vizualiza</p>
        </div>
        
    )};


export default Evaluare_Proiect;