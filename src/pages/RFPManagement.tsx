import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../store";
import { rfpActions } from "../store/actions/rfp.actions";
import { emailActions } from "../store/actions/email.actions";
import { vendorActions } from "../store/actions/vendor.actions";
import { rfpSelectors } from "../store/selectors/rfp.selector";
import { emailSelectors } from "../store/selectors/email.selector";
import { vendorSelectors } from "../store/selectors/vendor.selector";
import { type RFP, type FullRFP } from "../store/types/rfp.types";
import { Loader2, Plus, Edit, Trash2, Eye, Search, Send } from "lucide-react";
import ViewRFPModal from "../cards/RFPViewCard";
import { EditRFPModal } from "../cards/RFPEditForm";
import VendorSelectionModal from "../cards/VendorSelectionModal";
import { rfpAPI } from "../services/api";
import { useToast } from "../ui/Toast";

const RFPManagement = () => {
  const { showToast } = useToast();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rfps = useAppSelector(rfpSelectors.selectAllRFPs);
  const loading = useAppSelector(rfpSelectors.selectRFPLoading);
  const error = useAppSelector(rfpSelectors.selectRFPError);
  
  const vendors = useAppSelector(vendorSelectors.selectAllVendors);
  const emailLoading = useAppSelector(emailSelectors.selectEmailLoading);
  const emailSuccess = useAppSelector(emailSelectors.selectEmailSuccess);
  const sendResult = useAppSelector(emailSelectors.selectSendResult);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewRFP, setViewRFP] = useState<FullRFP | null>(null);
  const [editRFP, setEditRFP] = useState<FullRFP | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sendRFP, setSendRFP] = useState<RFP | null>(null);
  const [showVendorModal, setShowVendorModal] = useState(false);

  useEffect(() => {
    const fetchRFPs = async () => {
      dispatch(rfpActions.clearErrors());
      try {
        const response = await rfpAPI.getAllRFPs();
        dispatch(rfpActions.getAllRFPsSuccess(response.data.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRFPs();
  }, [dispatch]);

  useEffect(() => {
    dispatch(vendorActions.getAllVendors());
  }, [dispatch]);

  useEffect(() => {
    if (emailSuccess && sendResult) {
      showToast(`RFP sent successfully to ${sendResult.sent} vendor(s)!`, "success");
      dispatch(emailActions.clearErrors());
      setShowVendorModal(false);
      setSendRFP(null);

      const fetchRFPs = async () => {
        try {
          const response = await rfpAPI.getAllRFPs();
          dispatch(rfpActions.getAllRFPsSuccess(response.data.data));
        } catch (err) {
          console.error(err);
        }
      };
      fetchRFPs();
    }
  }, [emailSuccess, sendResult, dispatch]);

  const handleCreateRFP = () => {
    navigate("/create-rfp");
  };

  const handleDelete = async (rfp: RFP) => {
    if (window.confirm(`Are you sure you want to delete "${rfp.title}"?`)) {
      setDeletingId(rfp._id);
      try {
        await rfpAPI.deleteRFP(rfp._id);
        const response = await rfpAPI.getAllRFPs();
        dispatch(rfpActions.getAllRFPsSuccess(response.data.data));
      } catch (err) {
        console.error(err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleSendRFP = (rfp: RFP) => {
    setSendRFP(rfp);
    setShowVendorModal(true);
  };

  const handleSendEmails = (selectedVendorIds: string[]) => {
    if (sendRFP) {
      dispatch(emailActions.sendRFPToVendors(sendRFP._id, selectedVendorIds));
    }
  };

  const handleViewRFP = async (rfp: RFP) => {
    try {
      const response = await rfpAPI.getRFPById(rfp._id);
      setViewRFP(response.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load RFP details");
    }
  };

  const handleEditRFP = async (rfp: RFP) => {
    try {
      const response = await rfpAPI.getRFPById(rfp._id);
      setEditRFP(response.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load RFP details");
    }
  };

  const filteredRFPs = rfps.filter((rfp) =>
    rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rfp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">RFP Management</h1>
            <p className="text-gray-600">Manage your Requests for Proposals efficiently</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search RFPs by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>
            <button
              onClick={handleCreateRFP}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create RFP
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              <span className="ml-4 text-xl text-gray-600">Loading RFPs...</span>
            </div>
          ) : filteredRFPs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-500 mb-6">No RFPs found</p>
              <button
                onClick={handleCreateRFP}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Your First RFP
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRFPs.map((rfp) => (
                <div
                  key={rfp._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex items-start justify-end gap-2 mb-4">
                    <button
                      onClick={() => handleSendRFP(rfp)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Send RFP to Vendors"
                      disabled={rfp.status !== "draft"}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditRFP(rfp)}
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Edit RFP"
                      disabled={rfp.status !== "draft"}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(rfp)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                      title="Delete RFP"
                    >
                      {deletingId === rfp._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleViewRFP(rfp)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                      title="View RFP"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{rfp.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{rfp.description}</p>
                  <div className="flex justify-between items-center text-gray-700 text-sm mt-4">
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${
                        rfp.status === "draft" ? "bg-yellow-500" :
                        rfp.status === "sent" ? "bg-blue-500" :
                        rfp.status === "responses" ? "bg-purple-500" :
                        rfp.status === "evaluated" ? "bg-green-500" :
                        "bg-gray-500"
                      }`} />
                      <strong className="capitalize">{rfp.status}</strong>
                    </span>
                    <span>₹{rfp.budget?.toLocaleString() || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6">
              {error}
            </div>
          )}
        </div>

        {viewRFP && createPortal(
          <ViewRFPModal rfp={viewRFP} onClose={() => setViewRFP(null)} />,
          document.body
        )}

        {editRFP && createPortal(
          <EditRFPModal
            rfp={editRFP}
            onClose={() => setEditRFP(null)}
            onSave={async () => {
              const response = await rfpAPI.getAllRFPs();
              dispatch(rfpActions.getAllRFPsSuccess(response.data.data));
              setEditRFP(null);
            }}
          />,
          document.body
        )}

        {showVendorModal && sendRFP && createPortal(
          <VendorSelectionModal
            isOpen={showVendorModal}
            onClose={() => {
              setShowVendorModal(false);
              setSendRFP(null);
            }}
            vendors={vendors}
            onSendEmails={handleSendEmails}
            loading={emailLoading}
            rfpTitle={sendRFP.title}
          />,
          document.body
        )}
      </div>
    </AppLayout>
  );
};

export default RFPManagement;