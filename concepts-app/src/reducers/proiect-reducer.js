
const INITIAL_STATE = {
    proiectList : [],
    error: null,
    fetching: false,
    fetched: true
}
export default function reducer( state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'cbProiecte_PENDING':
            return {...state,error:null, fetching:true, fetched:false}
        case 'cbProiecte_FULFILLED':
            return {...state,proiectList:action.payload.listaProiecte, error: false, fetching: false, fetched:true }
        case 'cbProiecte_REJECTED':
            return {...state,error:action.payload, error: false, fetching: false, fetched:true }

        default:
            return {...state }
    }
}