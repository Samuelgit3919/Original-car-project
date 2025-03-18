// import Layout from "./Layout"
// import Landing from "./Pages/Landing"
// import ViewCar from "./components/View/ViewCar"
import Login from "./components/Auth/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./components/Home/Home"
import Admin from "./components/Admin/Admin"
import SignUp from "./components/Auth/SignUp"
import Manager from "./components/Manager/Manager"
import ViewCar from "./components/ViewCar/ViewCar"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/viewCar" element={<ViewCar />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App