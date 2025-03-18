// import Layout from "./Layout"
// import Landing from "./Pages/Landing"
// import ViewCar from "./components/View/ViewCar"
import Auth from "./components/Auth/Auth"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./components/Header/Home"
import Admin from "./components/Admin/Admin"
import SignUp from "./components/Auth/SignUp"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App