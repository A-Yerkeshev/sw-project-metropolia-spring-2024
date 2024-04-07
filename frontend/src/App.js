import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Signup from "./pages/Login/Signup";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage";
import QR from "./pages/QR";
import Feedback from "./pages/Feedback/Feedback";
import Navbar from "./components/Navbar/Navbar";
import Courses from "./pages/CoursesList/Courses";
import Sessions from "./pages/Sessions/Sessions";
import Users from "./pages/Users/Users";

function App() {
  const { user } = useAuthContext();
  //console.log({ user });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/Courses" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/Courses" />}
          />
          <Route path="/share/:sessionName" element={<QR />} />
          <Route path="/feedback/new" element={<Feedback />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Course" element={<Sessions />} />
          <Route path="/sessions/:courseId" element={<Sessions />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
