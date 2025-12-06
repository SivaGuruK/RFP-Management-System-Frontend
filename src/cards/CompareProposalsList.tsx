import AppLayout from "../layouts/AppLayout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { rfpActions } from "../store/actions/rfp.actions";
import { rfpSelectors } from "../store/selectors/rfp.selector";
import { comparisonActions } from "../store/actions/comparison.actions";
import { useNavigate } from "react-router-dom";

export default function CompareProposalsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const rfps = useAppSelector(rfpSelectors.selectAllRFPs);
  const loading = useAppSelector(rfpSelectors.selectRFPLoading);

  useEffect(() => {
    dispatch(rfpActions.getAllRFPs());
  }, [dispatch]);

  const handleCompare = async (rfpId: string) => {
    try {
      await dispatch(comparisonActions.compareProposals(rfpId));
      navigate(`/compare/${rfpId}`);
    } catch (err) {
      console.error("Comparison API failed", err);
    }
  };

  if (loading) return <AppLayout>Loading...</AppLayout>;

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Select RFP for Comparison</h1>

        <div className="grid grid-cols-1 gap-4">
          {rfps.map((rfp) => (
            <div
              key={rfp._id}
              className="p-4 rounded-lg border hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold">{rfp.title}</h2>
              </div>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => handleCompare(rfp._id)}
              >
                Compare
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
