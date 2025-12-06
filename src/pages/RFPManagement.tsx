import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../store";
import { rfpActions } from "../store/actions/rfp.actions";
import { rfpSelectors } from "../store/selectors/rfp.selector";
import { type RFP } from "../store/types/rfp.types";
import { Loader2, Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import ViewRFPModal from "../cards/RFPViewCard";
import { EditRFPModal } from "../cards/RFPEditForm";
import { rfpAPI } from "../services/api";

const RFPManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rfps = useAppSelector(rfpSelectors.selectAllRFPs);
  const loading = useAppSelector(rfpSelectors.selectRFPLoading);
  const error = useAppSelector(rfpSelectors.selectRFPError);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [viewRFP, setViewRFP] = useState<RFP | null>(null);
  const [editRFP, setEditRFP] = useState<RFP | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRFPs = async () => {
      dispatch(rfpActions.clearErrors());
      try {
        const response = await rfpAPI.getAllRFPs(statusFilter || undefined, searchTerm || undefined);
        dispatch(rfpActions.setAllRFPs(response.data.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRFPs();
  }, [dispatch, statusFilter, searchTerm]);

  const handleCreateRFP = () => {
    navigate("/create-rfp");
  };

  const handleDelete = async (rfp: RFP) => {
    if (window.confirm(`Are you sure you want to delete "${rfp.title}"?`)) {
      setDeletingId(rfp._id);
      try {
        await rfpAPI.deleteRFP(rfp._id);
        // Refresh after delete
        const response = await rfpAPI.getAllRFPs(statusFilter || undefined, searchTerm || undefined);
        dispatch(rfpActions.setAllRFPs(response.data.data));
      } catch (err) {
        console.error(err);
        alert("Failed to delete RFP");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">RFP Management</h1>
            <p className="text-gray-600">Manage your Requests for Proposals efficiently</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search RFPs by title"
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
          ) : rfps.length === 0 ? (
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
              {rfps.map((rfp) => (
                <div
                  key={rfp._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex items-start justify-end gap-2 mb-4">
                    <button
                      onClick={() => setEditRFP(rfp)}
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all"
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
                      onClick={() => setViewRFP(rfp)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                      title="View RFP"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{rfp.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{rfp.description}</p>
                  <div className="flex justify-between items-center text-gray-700 text-sm mt-4">
                    <span>Status: <strong>{rfp.status}</strong></span>
                    <span>Budget: ₹{rfp.budget.toLocaleString()}</span>
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

        {/* Modals */}
        {viewRFP && createPortal(
          <ViewRFPModal rfp={viewRFP} onClose={() => setViewRFP(null)} />,
          document.body
        )}

        {editRFP && createPortal(
          <EditRFPModal
            rfp={editRFP}
            onClose={() => setEditRFP(null)}
            onSave={async () => {
              const response = await rfpAPI.getAllRFPs(statusFilter || undefined, searchTerm || undefined);
              dispatch(rfpActions.setAllRFPs(response.data.data));
              setEditRFP(null);
            }}
          />,
          document.body
        )}
      </div>
    </AppLayout>
  );
};

export default RFPManagement;
