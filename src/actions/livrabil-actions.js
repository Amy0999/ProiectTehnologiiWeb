import {SERVER } from '../config/global' 


export const cbLivrabile = "cbLivrabile";
export const putLivrabile = "putLivrabile";

export function populareCbLivrabile() {
    return{
        type: cbLivrabile,
        payload: async () => {
            const response = await fetch(`${SERVER}/api/livrabil`)
            const data = await response.json()
            return data
        }
    }
}


export function updateLivrabil(idProiectSelectat,idLivrabilSelectat,linkLivrabil) {
    return{
        type: putLivrabile,
        payload: async () => {
            const response = await fetch(`${SERVER}/api/livrabil`,{
                method:'put',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ProiectId:idProiectSelectat,idLivrabil:idLivrabilSelectat,LivrabilLink:linkLivrabil})
            })
            const data = await response.json()
            console.log(data)
            return data
        }
    }
}