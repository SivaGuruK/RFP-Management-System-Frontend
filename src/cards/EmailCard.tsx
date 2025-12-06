import { useState } from "react";
import { Mail } from "lucide-react";
import { type Email } from "../store/types/email.types";
import EmailDetailModal from "./EmailDetailModal";
import StatusBadge from "../ui/StatusBadge";
import { formatDate } from "../utils/date";
import { extractEmailInfo } from "../utils/email";

interface EmailCardProps {
  email: Email;
}

const EmailCard: React.FC<EmailCardProps> = ({ email }) => {

  const [showDetailModal, setShowDetailModal] = useState(false);
  const { vendorName, vendorEmail, rfpTitle } = extractEmailInfo(email);
  const isParsed = email.status === "parsed";

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={18} className="text-blue-600" />
              <div className="flex flex-col">
                <span className="font-semibold">{vendorName}</span>
                <span className="text-xs text-gray-500">{vendorEmail}</span>
              </div>
              <StatusBadge status={email.status} />
              {isParsed && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Auto-Parsed
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mb-2">Re: {rfpTitle}</div>
            <h3 className="font-medium mb-1">{email.subject}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{email.body}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>
                {email.receivedAt
                  ? `Received: ${formatDate(email.receivedAt)}`
                  : email.sentAt
                  ? `Sent: ${formatDate(email.sentAt)}`
                  : `Created: ${formatDate(email.createdAt)}`}
              </span>
              <span>Direction: {email.direction}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowDetailModal(true)}
              className="px-3 py-1 rounded-lg bg-blue-400 text-white text-sm hover:bg-blue-500 transition"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {showDetailModal && (
        <EmailDetailModal email={email} onClose={() => setShowDetailModal(false)} />
      )}
    </>
  );
};

export default EmailCard;
