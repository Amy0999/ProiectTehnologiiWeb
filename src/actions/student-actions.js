import {SERVER } from '../config/global' 

export const LogIn_STUDENTS = "LogIn_STUDENTS"
export const LogIn_REFRESH = "LogIn_REFRESH"


export function logIn_STUDENTS(id, parola) { 
    return {
        type: LogIn_STUDENTS,
        payload: async () => {

            const response = await fetch(`${SERVER}/api/login/${id}`, {
                method:'post',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({password:parola})
            })
            const data = await response.json()
            console.log(data)
            return data
        }
    }
}

export function logIn_refresh() { 
    return {
        type: LogIn_REFRESH,
        payload: async () => {
            return false;
        }
    }
}



