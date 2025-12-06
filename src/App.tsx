import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateRFP from "./pages/CreateRFP";
import VendorsManagement from "./pages/VendorsManagement";
import RFPManagement from "./pages/RFPManagement";
import CompareProposal from "./pages/CompareProposal";
import Inboxpage from "./pages/InboxPage";
import { Provider } from 'react-redux';
import store from './store';
import CompareProposalsList from "./cards/CompareProposalsList";
import { ToastProvider } from "./ui/Toast";

function App() {
  return (
    <ToastProvider>
    <Provider store={store}>
    <Routes>
      <Route path="/" element={ <Dashboard />}/>
      <Route path="/dashboard" element={ <Dashboard />}/>
      <Route path="/create-rfp" element={<CreateRFP />}/>
      <Route path="/vendors" element={<VendorsManagement />}/>
      <Route path="/rfps" element={<RFPManagement />} />
      <Route path="/compare" element={<CompareProposalsList />}/>
      <Route path="/compare/:rfpId" element={<CompareProposal />}/>
      <Route path="/inbox" element={<Inboxpage/>}/>
    </Routes>
    </Provider>
    </ToastProvider>
  )
}

export default App
