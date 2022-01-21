const INITIAL_STATE = { 
    logIn: false,
    idStudentLogat:0,
    idProiectStudentLogat:0,
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer( state = INITIAL_STATE, action) {
    switch(action.type) {
       
        case 'LogIn_STUDENTS_PENDING':
            return {...state,error:null, fetching:true, fetched:false}
        case 'LogIn_STUDENTS_FULFILLED':
                return {...state,logIn:action.payload.logInStatus, idProiectStudentLogat:action.payload.idProiect,idStudentLogat:action.payload.idStudent,error: false, fetching: false, fetched:true }
        case 'LogIn_STUDENTS_REJECTED':
                return {...state,error:action.payload, fetching:false, fetched:false}

        case 'LogIn_REFRESH_FULFILLED':
                return {...state,logIn:action.payload.logInRefresh, fetching:false, fetched:true}
        case 'LogIn_REFRESH_REJECTED':
                 return {...state,error:action.payload, fetching:false, fetched:false}
        case 'LogIn_REFRESH_PENDING':
                 return {...state,error:action.payload, fetching:false, fetched:false}


        default:
                return {...state}
         
    }


}