import React from "react";
import { Plus, Eye, Edit } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";

interface RFP {
  id: string;
  title: string;
  status: string;
  budget: number;
  vendors: number;
  responses: number;
  created: string;
}

interface RecentRFPsProps {
  rfps: RFP[];
  onCreate?: () => void;
}

const RecentRFPs: React.FC<RecentRFPsProps> = ({ rfps, onCreate }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent RFPs</h2>
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Create RFP
        </button>
      </div>
      <div className="space-y-3">
        {rfps.map((rfp) => (
          <div
            key={rfp.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{rfp.title}</h3>
                  <StatusBadge status={rfp.status} />
                </div>
                <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                  <span>Budget: ${rfp.budget.toLocaleString()}</span>
                  <span>Vendors: {rfp.vendors}</span>
                  <span>Responses: {rfp.responses}</span>
                  <span>Created: {rfp.created}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Eye size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Edit size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRFPs;
