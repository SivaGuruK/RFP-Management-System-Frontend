import { Mail } from "lucide-react";


const EmailCard = ({ email }: { email: any }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Mail size={18} className="text-blue-600" />
            <span className="font-semibold">{email.from}</span>

            {email.parsed && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                Auto-Parsed
              </span>
            )}
          </div>

          <h3 className="font-medium mb-1">{email.subject}</h3>
          <p className="text-sm text-gray-600 mb-2">{email.body}</p>
          <span className="text-xs text-gray-500">{email.received}</span>
        </div>

        {email.parsed && (
          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            View Proposal
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailCard;
