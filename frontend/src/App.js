import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthContext} from './hooks/useAuthContext';

// pages & components
import Signup from './pages/Signup';
import Login from './pages/Login';
import QR from './pages/QR';
import Feedback from './pages/Feedback';

function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Login />} />
          <Route path="/signup" element= {!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/share" element= {<QR />}/>
          <Route path="/feedback/new" element= {<Feedback />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
