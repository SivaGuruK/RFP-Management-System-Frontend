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

  if (loading) return <AppLayout>Loading...</AppLayout>;
  if(!comparisonResult)return <AppLayout>No Proposals Recieved for this RFP</AppLayout>;

  const mappedProposals = comparisonResult.proposals?.map((p) => {
    return {
      id: p.id,
      vendor: p.vendor.name,
      score: p.score,
      price: p.price,
      delivery: p.deliveryTime,
      warranty: p.warranty,
      strengths: p.strengths,
      weaknesses: p.weaknesses,
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
            Proposal Comparison – {comparisonResult.rfp.title}
          </h2>

          {topRecommendation && (
            <AIComparison
              vendor={topRecommendation.vendor.name}
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