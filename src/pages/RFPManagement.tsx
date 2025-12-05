import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { DataGridTable } from "../ui/DataGridTable";
import { rfpColumns } from "../utils/ColumnDef";
import { useAppDispatch, useAppSelector } from "../store";
import { rfpActions } from "../store/actions/rfp.actions";
import { rfpSelectors } from "../store/selectors/rfp.selector";
import {type RFP } from "../store/types/rfp.types";
import { Loader2 } from "lucide-react";

const RFPManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rfps = useAppSelector(rfpSelectors.selectAllRFPs);
  const loading = useAppSelector(rfpSelectors.selectRFPLoading);
  const error = useAppSelector(rfpSelectors.selectRFPError);

  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    dispatch(rfpActions.getAllRFPs(statusFilter || undefined));
  }, [dispatch, statusFilter]);

  const handleCreateRFP = () => {
    navigate("/create-rfp");
  };

  const handleRowAction = (action: string, row: RFP) => {
    switch (action) {
      case "view":
        navigate(`/rfps/${row._id}`);
        break;
      case "edit":
        navigate(`/rfps/${row._id}/edit`);
        break;
      case "delete":
        if (window.confirm(`Are you sure you want to delete "${row.title}"?`)) {
          dispatch(rfpActions.deleteRFP(row._id));
        }
        break;
      default:
        break;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">RFP Management</h1>
            <p className="text-gray-600 mt-1">Manage your Requests for Proposals</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="responses">Responses</option>
              <option value="evaluated">Evaluated</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading RFPs...</span>
          </div>
        ) : (
          <DataGridTable<RFP>
            data={rfps}
            columns={rfpColumns}
            searchKey="title"
            addButton={{
              label: "Create New RFP",
              onClick: handleCreateRFP,
            }}
            onRowAction={handleRowAction}
          />
        )}

        {!loading && rfps.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 mb-4">No RFPs found</p>
            <button
              onClick={handleCreateRFP}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First RFP
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default RFPManagement;