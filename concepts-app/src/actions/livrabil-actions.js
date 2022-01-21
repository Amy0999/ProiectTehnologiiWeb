import {SERVER } from '../config/global' 


export const cbLivrabile = "cbLivrabile";
export const putLivrabile = "putLivrabile";
export const getLivrabilPtEvaluare1 = "getLivrabilPtEvaluare";
export const postLivrabilPtEvaluare1 = "postLivrabilPtEvaluare1";

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


export function getLivrabilPtEvaluare(idProiectSelectat) {
    return{
        type: getLivrabilPtEvaluare1,
        payload: async () => {
            const response = await fetch(`${SERVER}/api/getLivrabilPtEvaluare`,{
                method:'post',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({ProiectId:idProiectSelectat})
            })
            const data = await response.json()
            return data.livrabil
        }
    }
}

export function postLivrabilPtEvaluare(studentId,nota,livrabilId) {
    return{
        type: postLivrabilPtEvaluare1,
        payload: async () => {
            const response = await fetch(`${SERVER}/api/evaluareLivrabil`,{
                method:'post',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({studentId:studentId,nota:nota,livrabilId:livrabilId})
            })
            const data = await response.json()
            return data
        }
    }
}