import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateRFP from "./pages/CreateRFP";
import VendorsManagement from "./pages/VendorsManagement";
import RFPManagement from "./pages/RFPManagement";
import CompareProposal from "./pages/CompareProposal";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Dashboard />}/>
      <Route path="/dashboard" element={ <Dashboard />}/>
      <Route path="/create-rfp" element={<CreateRFP />}/>
      <Route path="/vendors" element={<VendorsManagement />}/>
      <Route path="/rfps" element={<RFPManagement />} />
      <Route path="/compare" element={<CompareProposal />}/>
    </Routes>
  )
}

export default App
