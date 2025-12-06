import { AlertCircle } from "lucide-react";

interface AIRecommendationProps {
  vendor: string;
  price: number;
  warranty: string;
  delivery: string;
  score: number;
}

const AIComparison: React.FC<AIRecommendationProps> = ({ vendor, price, warranty, delivery, score }) => (
  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 mb-6 border border-purple-200">
    <div className="flex items-start gap-3">
      <AlertCircle className="text-purple-600 mt-1" size={20} />
      <div>
        <p className="font-semibold text-purple-900 mb-1">AI Recommendation</p>
        <p className="text-sm text-purple-800">
          Based on the analysis, <strong>{vendor}</strong> offers the best overall value with competitive pricing (${price.toLocaleString()}), 
          {warranty} warranty, and delivery time ({delivery}). They score {score}/100 in our evaluation.
        </p>
      </div>
    </div>
  </div>
);

export default AIComparison;
