import { applyMiddleware , createStore} from "redux";
import logger from 'redux-logger'
import reducer from '../reducers'
import promise from 'redux-promise-middleware'

const middlewareList = [ promise, logger]
const middleware = applyMiddleware(...middlewareList)

const store = createStore(reducer, middleware)

export default store