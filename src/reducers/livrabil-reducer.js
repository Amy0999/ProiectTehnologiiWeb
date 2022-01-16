
const INITIAL_STATE = {
    livrabilList : [],
    error: null,
    fetching: false,
    fetched: true
}
export default function reducer( state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'cbLivrabile_PENDING':
            return {...state,error:null, fetching:true, fetched:false}
        case 'cbLivrabile_FULFILLED':
            return {...state,livrabilList:action.payload, error: false, fetching: false, fetched:true }
        case 'cbLivrabile_REJECTED':
            return {...state,error:action.payload, error: false, fetching: false, fetched:true }

        default:
            return {...state }
    }
}