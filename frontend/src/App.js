import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthContext} from './hooks/useAuthContext';

// pages & components
import Signup from './pages/Signup';
import Login from './pages/Login';
import QR from './pages/QR';
import Feedback from './pages/Feedback';
import Navbar from './components/Navbar/Navbar';
import CoursesList from './pages/CoursesList/CoursesList';

function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element= {<Login />} />
          <Route path="/signup" element= {!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/share" element= {<QR />}/>
          <Route path="/feedback/new" element= {<Feedback />}/>
          <Route path="/CoursesList" element= {<CoursesList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;