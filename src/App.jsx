import Admin from "./components/Admin/Admin"
// import Layout from "./Layout"
import Landing from "./Pages/Landing"
// import ViewCar from "./components/View/ViewCar"
import Auth from "./components/Auth/Auth"
import { BrowserRouter as Router, Routes, Route } from "react-router"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
        {/* <Route path="/viewcar" element={<ViewCar />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App