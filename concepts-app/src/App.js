import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Login_Stud from './pages/loginStud';
import Login_Teach from './pages/loginTeach';
import Login_Main from './pages/loginMain';
import View_Teach from './pages/teacherView';
import Student_View from './pages/studentView';
import Incarcare_Proiect from './pages/incarcareProiect';
import Evaluare_Proiect from './pages/evaluareProiect';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login_Main/>}/>
        <Route path='/student' element={<Login_Stud/>} />
        <Route path='/teacher' element={<Login_Teach/>} />
        <Route path='/teacher-page' element={<View_Teach/>} />
        <Route path='/student-page' element={<Student_View/>} />
        <Route path='/student-evaluare-proiect' element={<Evaluare_Proiect/>} />
        <Route path='/student-incarcare-proiect' element={<Incarcare_Proiect/>} />
      </Routes>
    </Router>
    
  );
  

}

export default App;
