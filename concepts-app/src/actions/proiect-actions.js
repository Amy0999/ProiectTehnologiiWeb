import {SERVER } from '../config/global' 


export const cbProiecte = "cbProiecte";

export function populareCbProiecte(idProiectCorespStudent) {
    return{
        type: cbProiecte,
        payload: async () => {
            const response = await fetch(`${SERVER}/api/proiect/${idProiectCorespStudent}`)
            const data = await response.json()
            console.log(data)
            return data
        }
    }
}