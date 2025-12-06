// src/cards/EmailCard.tsx - REPLACE ENTIRE FILE

import { useState } from "react";
import { Mail, ExternalLink } from "lucide-react";
import {type Email } from "../store/types/email.types";
import EmailDetailModal from "./EmailDetailModal";

interface EmailCardProps {
  email: Email;
}

const EmailCard: React.FC<EmailCardProps> = ({ email }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Safely check if vendor info is populated with proper null checks
  const vendorName = 
    email.vendorId && typeof email.vendorId === 'object' && email.vendorId.name
      ? email.vendorId.name
      : 'Unknown Vendor';
  
  const vendorEmail = 
    email.vendorId && typeof email.vendorId === 'object' && email.vendorId.email
      ? email.vendorId.email
      : email.from;

  // Safely check if RFP info is populated with proper null checks
  const rfpTitle = 
    email.rfpId && typeof email.rfpId === 'object' && email.rfpId.title
      ? email.rfpId.title
      : 'Unknown RFP';

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-blue-100 text-blue-700';
      case 'parsed':
        return 'bg-green-100 text-green-700';
      case 'sent':
        return 'bg-gray-100 text-gray-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const isParsed = email.status === 'parsed';

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

              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                  email.status
                )}`}
              >
                {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
              </span>

              {isParsed && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Auto-Parsed
                </span>
              )}
            </div>

            {/* RFP Reference */}
            <div className="text-xs text-gray-500 mb-2">
              Re: {rfpTitle}
            </div>

            <h3 className="font-medium mb-1">{email.subject}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{email.body}</p>

            {/* Attachments */}
            {email.attachments && email.attachments.length > 0 && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">
                  📎 {email.attachments.length} attachment(s)
                </span>
              </div>
            )}

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
            {isParsed && email.parsedProposalId && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-1">
                <ExternalLink size={14} />
                View Proposal
              </button>
            )}
            <button 
              onClick={() => setShowDetailModal(true)}
              className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Email Detail Modal */}
      {showDetailModal && (
        <EmailDetailModal 
          email={email} 
          onClose={() => setShowDetailModal(false)} 
        />
      )}
    </>
  );
};

export default EmailCard;