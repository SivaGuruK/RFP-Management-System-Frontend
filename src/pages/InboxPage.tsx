// src/pages/Inboxpage.tsx - REPLACE ENTIRE FILE

import { useEffect, useState } from "react";
import EmailList from "../cards/EmailList";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../store";
import { emailActions } from "../store/actions/email.actions";
import { emailSelectors } from "../store/selectors/email.selector";
import { Loader2 } from "lucide-react";

const Inboxpage = () => {
  const dispatch = useAppDispatch();

  // Get state from Redux
  const emails = useAppSelector(emailSelectors.selectInboundEmails);
  const loading = useAppSelector(emailSelectors.selectEmailLoading);
  const error = useAppSelector(emailSelectors.selectEmailError);

  const [statusFilter, setStatusFilter] = useState<string>("");

  // Fetch inbound emails on component mount
  useEffect(() => {
    dispatch(emailActions.getAllEmails("inbound", statusFilter || undefined));
  }, [dispatch, statusFilter]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Email Inbox</h1>
            <p>View and manage vendor responses</p>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Filter by Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="received">Received</option>
              <option value="parsed">Parsed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Inbound Emails</h2>
            <span className="text-sm text-gray-600">
              {emails.length} email(s)
            </span>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading emails...</span>
            </div>
          ) : emails.length === 0 ? (
            // Empty State
            <div className="text-center py-12 text-gray-500">
              <p>No inbound emails yet</p>
              <p className="text-sm mt-2">
                Vendor responses will appear here
              </p>
            </div>
          ) : (
            // Email List
            <EmailList emails={emails} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Inboxpage;