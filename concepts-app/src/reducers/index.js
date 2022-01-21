import { combineReducers  } from "redux";

import student from './student-reducer'
import proiect from './proiect-reducer'
import livrabil from './livrabil-reducer'

export default combineReducers({
    student,
    proiect,
    livrabil
})
