import { CheckCircle } from "lucide-react";

interface Proposal {
  id: string | number;
  vendor: string;
  score: number;
  price: number;
  delivery: string;
  warranty: string;
  strengths: string[];
  weaknesses: string[];
}

interface ComparisonCardProps {
  proposal: Proposal;
  onSelect?: (id: number | string) => void;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ proposal, onSelect }) => (
  <div className={`border-2 rounded-xl p-6 cursor-pointer ${
      proposal.score >= 90 ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
    }`}
    onClick={() => onSelect && onSelect(proposal.id)}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-lg">{proposal.vendor}</h3>
      <div className="text-right">
        <p className="text-2xl font-bold text-green-600">{proposal.score}</p>
        <p className="text-xs text-gray-600">AI Score</p>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="text-sm text-gray-600">Total Price</span>
        <span className="font-semibold text-lg">${proposal.price.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="text-sm text-gray-600">Delivery Time</span>
        <span className="font-semibold">{proposal.delivery}</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="text-sm text-gray-600">Warranty</span>
        <span className="font-semibold">{proposal.warranty}</span>
      </div>
    </div>

    {proposal.strengths.length > 0 && (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">Strengths</p>
        <ul className="text-sm space-y-1">
          {proposal.strengths.map((s, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-600 mt-0.5" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {proposal.weaknesses.length > 0 && (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-2">Weaknesses</p>
        <ul className="text-sm space-y-1">
          {proposal.weaknesses.map((s, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-red-600 mt-0.5" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ComparisonCard;
