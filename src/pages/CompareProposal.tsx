import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AIComparison from "../cards/AIComparison";
import ComparisonCard from "../cards/ComparisonCard";
import { useAppDispatch, useAppSelector } from "../store";
import { comparisonActions } from "../store/actions/comparison.actions";
import { comparisonSelectors } from "../store/selectors/comparison.selector";

export default function CompareProposal() {
  const { rfpId } = useParams<{ rfpId: string }>();
  const dispatch = useAppDispatch();

  const comparisonResult = useAppSelector(comparisonSelectors.selectComparisonResult);
  const loading = useAppSelector(comparisonSelectors.selectComparisonLoading);

  useEffect(() => {
    if (rfpId) {
      dispatch(comparisonActions.getComparisonResults(rfpId));
    }
  }, [dispatch, rfpId]);

  const handleSelect = (proposalId: string | number) => {
    dispatch(comparisonActions.selectVendor(proposalId.toString()));
  };

  if (loading || !comparisonResult) return <AppLayout>Loading...</AppLayout>;

  const mappedProposals = comparisonResult.proposals?.map((p) => {
  const scoreData = comparisonResult.scores?.find(s => s.proposalId === p._id);
    
    return {
      id: p._id,
      vendor: typeof p.vendorId === 'object' ? p.vendorId.name : "Unknown Vendor",
      score: scoreData?.score || p.aiScore || 0,
      price: p.price || 0,
      delivery: p.deliveryTime || "N/A",
      warranty: p.warranty || "N/A",
      strengths: scoreData?.strengths || p.aiAnalysis?.strengths || [],
      weaknesses: scoreData?.weaknesses || p.aiAnalysis?.weaknesses || [],
    };
  }) || [];

  const topRecommendation = comparisonResult.topRecommendation;

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Proposal Comparison</h1>
        <p>AI-assisted proposal evaluation</p>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-xl font-bold mb-4">
            Proposal Comparison – {
              comparisonResult.proposals?.[0] && 
              typeof comparisonResult.proposals[0].rfpId === 'object' 
                ? comparisonResult.proposals[0].rfpId.title 
                : "RFP"
            }
          </h2>

          {topRecommendation && (
            <AIComparison
              vendor={topRecommendation.vendor}
              price={topRecommendation.price}
              warranty={topRecommendation.warranty}
              delivery={topRecommendation.deliveryTime}
              score={topRecommendation.score}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {mappedProposals.map((proposal) => (
              <ComparisonCard
                key={proposal.id}
                proposal={proposal}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {topRecommendation?.recommendation && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-700">{topRecommendation.recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}