// src/pages/Inboxpage.tsx - REPLACE ENTIRE FILE

import { useEffect, useState } from "react";
import EmailList from "../cards/EmailList";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../store";
import { emailActions } from "../store/actions/email.actions";
import { emailSelectors } from "../store/selectors/email.selector";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/Toast";

const Inboxpage = () => {
  const { showToast } = useToast();

  const dispatch = useAppDispatch();

  const emails = useAppSelector(emailSelectors.selectInboundEmails);
  const loading = useAppSelector(emailSelectors.selectEmailLoading);
  const error = useAppSelector(emailSelectors.selectEmailError);

  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    dispatch(emailActions.getAllEmails("inbound", statusFilter || undefined));
  }, [dispatch, statusFilter]);

  useEffect(() => {
  if (error) showToast(error, "error");
}, [error]);
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Email Inbox</h1>
            <p>View and manage vendor responses</p>
          </div>

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

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Inbound Emails</h2>
            <span className="text-sm text-gray-600">
              {emails.length} email(s)
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading emails...</span>
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No inbound emails yet</p>
              <p className="text-sm mt-2">
                Vendor responses will appear here
              </p>
            </div>
          ) : (
            <EmailList emails={emails} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Inboxpage;