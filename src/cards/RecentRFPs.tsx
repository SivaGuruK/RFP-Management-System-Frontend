import React, { useState } from "react";
import { Plus, Eye, Edit } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import ViewRFPModal from "./RFPViewCard";
import { EditRFPModal } from "./RFPEditForm";
import { rfpAPI } from "../services/api";

interface RFP {
  id: string;
  title: string;
  status: string;
  budget: number;
  vendors: number;
  items: number;
  created: string;
}

interface FullRFP {
  _id: string;
  title: string;
  description: string;
  budget: number;
  items: Array<{
    _id: string;
    name: string;
    quantity: number;
    specifications: string;
  }>;
  deliveryTimeline: string;
  paymentTerms: string;
  warrantyRequired: string;
  status: string;
  vendorsSent: string[];
  createdAt: string;
  updatedAt: string;
}

interface RecentRFPsProps {
  rfps: RFP[];
  onCreate?: () => void;
}

const RecentRFPs: React.FC<RecentRFPsProps> = ({ rfps, onCreate }) => {
  const [viewRFP, setViewRFP] = useState<FullRFP | null>(null);
  const [editRFP, setEditRFP] = useState<FullRFP | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFullRFP = async (id: string, mode: 'view' | 'edit') => {
    setLoading(true);
    try {
      const response = await rfpAPI.getRFPById(id);
      const fullRFP = response.data.data;
      
      if (mode === 'view') {
        setViewRFP(fullRFP);
      } else {
        setEditRFP(fullRFP);
      }
    } catch (error) {
      console.error('Error fetching RFP:', error);
      alert('Failed to load RFP details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveComplete = () => {
    // Trigger parent refresh - you might want to pass a refresh callback
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent RFPs</h2>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Create RFP
        </button>
      </div>

      <div className="space-y-3">
        {rfps.map((rfp) => (
          <div
            key={rfp.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900">{rfp.title}</h3>
                  <StatusBadge status={rfp.status} />
                </div>
                <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                  <span>Budget: ₹{rfp.budget.toLocaleString()}</span>
                  <span>Vendors Sent: {rfp.vendors}</span>
                  <span>Items: {rfp.items}</span>
                  <span>Created: {rfp.created}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchFullRFP(rfp.id, 'view')}
                  disabled={loading}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 group"
                  title="View Details"
                >
                  <Eye size={18} className="text-gray-600 group-hover:text-blue-600" />
                </button>
                {rfp.status === 'draft' && (
                  <button
                    onClick={() => fetchFullRFP(rfp.id, 'edit')}
                    disabled={loading}
                    className="p-2 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 group"
                    title="Edit RFP"
                  >
                    <Edit size={18} className="text-gray-600 group-hover:text-green-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
          <div className="bg-white px-6 py-4 rounded-lg shadow-xl">
            <p className="text-gray-700 font-medium">Loading RFP details...</p>
          </div>
        </div>
      )}
      {viewRFP && <ViewRFPModal rfp={viewRFP} onClose={() => setViewRFP(null)} />}
      {editRFP && <EditRFPModal rfp={editRFP} onClose={() => setEditRFP(null)} onSave={handleSaveComplete} />}
    </div>
  );
};

export default RecentRFPs