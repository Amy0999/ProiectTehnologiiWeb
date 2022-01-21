
const INITIAL_STATE = {
    livrabilList : [],
    livrabilId:null,
    livrabilDeEvaluat: null,
    error: null,
    fetching: false,
    fetched: true
}
export default function reducer( state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'cbLivrabile_PENDING':
        case 'getLivrabilPtEvaluare_PENDING':
            return {...state,error:null, fetching:true, fetched:false}
        case 'cbLivrabile_FULFILLED':
            return {...state,livrabilList:action.payload, error: false, fetching: false, fetched:true }
        case 'getLivrabilPtEvaluare_FULFILLED':
            return {...state,livrabilId:action.payload.LivrabilId,livrabilDeEvaluat:action.payload.LivrabilLink, error: false, fetching: false, fetched:true }
        
        case 'cbLivrabile_REJECTED':
        case 'getLivrabilPtEvaluare_REJECTED':
            return {...state,error:action.payload, error: false, fetching: false, fetched:true }

        default:
            return {...state }
    }
}