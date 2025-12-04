import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateRFP from "./pages/CreateRFP";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Dashboard />}/>
      <Route path="/dashboard" element={ <Dashboard />}/>
      <Route path="/create-rfp" element={<CreateRFP />}/>
    </Routes>
  )
}

export default App
