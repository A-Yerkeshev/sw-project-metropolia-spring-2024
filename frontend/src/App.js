import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Signup from "./pages/Login/Signup";
import Login from "./pages/Login/Login";
import QR from "./pages/QR";
import Feedback from "./pages/Feedback/Feedback";
import Navbar from "./components/Navbar/Navbar";
import CoursesList from "./pages/CoursesList/CoursesList";
import Course from "./pages/Course/Course";
import Users from "./pages/Users/Users";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/share" element={<QR />} />
          <Route path="/feedback/new" element={<Feedback />} />
          <Route path="/CoursesList" element={<CoursesList />} />
          <Route path="/Course" element={<Course />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
