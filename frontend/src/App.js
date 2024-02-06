import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthContext} from './hooks/useAuthContext';

// pages & components
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Login />} />
          <Route path="/signup" element= {!user ? <Signup /> : <Navigate to="/" />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
