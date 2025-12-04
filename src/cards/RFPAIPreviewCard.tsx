import React from "react";
import { AlertCircle } from "lucide-react";

interface RFPPreviewCardProps {
  totalBudget: string;
  deliveryTimeline: string;
  paymentTerms: string;
  warranty: string;
  items: string[];
}

const RFPAIPreviewCard: React.FC<RFPPreviewCardProps> = ({
  totalBudget,
  deliveryTimeline,
  paymentTerms,
  warranty,
  items,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <AlertCircle size={20} className="text-blue-600" />
        AI-Generated RFP Preview
      </h3>
      <div className="bg-white rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="font-semibold">{totalBudget}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Delivery Timeline</p>
            <p className="font-semibold">{deliveryTimeline}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Terms</p>
            <p className="font-semibold">{paymentTerms}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Warranty Required</p>
            <p className="font-semibold">{warranty}</p>
          </div>
        </div>
        <div className="border-t pt-3">
          <p className="text-sm text-gray-600 mb-2">Items</p>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index} className="text-sm">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RFPAIPreviewCard;
