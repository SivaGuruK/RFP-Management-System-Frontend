import React from "react";
import { MessageSquare, Loader2 } from "lucide-react";

interface RFPInputCardProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
  loading?: boolean;
}

const RFPInputCard: React.FC<RFPInputCardProps> = ({
  description,
  onDescriptionChange,
  onGenerate,
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Describe your procurement needs</h3>
          <p className="text-sm text-gray-600 mb-4">
            Briefly describe the products or services you want to procure
          </p>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            rows={6}
            placeholder="Example: I need to procure 20 laptops with 16GB RAM and 15 monitors (27-inch) for our office. Budget is around $50,000 and we need them within 30 days..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={onGenerate}
            disabled={loading || !description.trim()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 mx-auto transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate RFP Structure"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RFPInputCard;