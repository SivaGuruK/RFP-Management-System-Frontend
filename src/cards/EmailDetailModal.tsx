import React from "react";
import { X, Mail, Calendar, ArrowRight, Paperclip } from "lucide-react";
import {type Email } from "../store/types/email.types";
import { formatDate } from "../utils/date";
import StatusBadge from "../ui/StatusBadge";
import { extractEmailInfo } from "../utils/email";

interface EmailDetailModalProps {
  email: Email;
  onClose: () => void;
}

const EmailDetailModal: React.FC<EmailDetailModalProps> = ({ email, onClose }) => {
  const { vendorName, vendorEmail, rfpTitle } = extractEmailInfo(email);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Mail size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{email.subject}</h2>
              <div className="flex items-center gap-2 text-blue-100">
                <StatusBadge status={email.status} />
                {email.status === 'parsed' && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Auto-Parsed
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">From</div>
              <div className="font-semibold text-gray-900">{vendorName}</div>
              <div className="text-sm text-gray-600">{vendorEmail}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">To</div>
              <div className="font-semibold text-gray-900">{email.to}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <Calendar size={16} />
                {email.direction === 'inbound' ? 'Received' : 'Sent'}
              </div>
              <div className="font-semibold text-gray-900">
                {email.receivedAt
                  ? formatDate(email.receivedAt)
                  : email.sentAt
                  ? formatDate(email.sentAt)
                  : formatDate(email.createdAt)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <ArrowRight size={16} />
                Direction
              </div>
              <div className="font-semibold text-gray-900 capitalize">
                {email.direction}
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm text-blue-700 font-medium mb-1">
              Related RFP
            </div>
            <div className="text-blue-900 font-semibold">{rfpTitle}</div>
          </div>

          {email.attachments && email.attachments.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                <Paperclip size={16} />
                Attachments ({email.attachments.length})
              </div>
              <div className="space-y-2">
                {email.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <Paperclip size={14} />
                    {attachment}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 font-medium mb-3">
              Message
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {email.body}
              </p>
            </div>
          </div>

          {email.status === 'parsed' && email.parsedProposalId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-green-800 font-semibold mb-1">
                    Proposal Parsed Successfully
                  </div>
                  <div className="text-sm text-green-700">
                    This email has been automatically parsed into a structured proposal
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  View Proposal
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
          >
            Close
          </button>
          {email.direction === 'inbound' && (
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailDetailModal;