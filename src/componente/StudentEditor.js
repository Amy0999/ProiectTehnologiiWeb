import { useEffect } from 'react'
import { useSelector , shallowEqual ,useDispatch} from 'react-redux'

import { studentActions} from '../actions'

const studentListSelector = state => state.student.studentList

function StudentEditor() {
    const studentList = useSelector(studentListSelector, shallowEqual)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(studentActions.getStudents())
    }, [dispatch])

    return (
        <div>
           {
               studentList.map( e=> <div key={e.id}> student {e.id} </div>)
           }
        </div>
    )
}
export default StudentEditor
