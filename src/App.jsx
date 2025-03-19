// import Layout from "./Layout"
// import Landing from "./Pages/Landing"
// import ViewCar from "./components/View/ViewCar"
import Login from "./components/Auth/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./components/Home/Home"
import Admin from "./components/Admin/Admin"
import SignUp from "./components/Auth/SignUp"
import Manager from "./components/Manager/Manager"
import Dashboard from "./components/Dashboard/Dashboard"
import ForgotPassword from "./components/Auth/ForgotPassword"
import ProtectedRoute from "./components/ProtetctedRoute";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRole="manager">
              <Manager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App