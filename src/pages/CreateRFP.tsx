import { useEffect, useState } from "react";
import RFPInputCard from "../cards/RFPInputCard";
import RFPAIPreviewCard from "../cards/RFPAIPreviewCard";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../store";
import { rfpActions } from "../store/actions/rfp.actions";
import { rfpSelectors } from "../store/selectors/rfp.selector";
import {type GeneratedRFP } from "../store/types/rfp.types";

const CreateRFP = () => {
  const dispatch = useAppDispatch();

  const generatedRFP = useAppSelector(rfpSelectors.selectGeneratedRFP);
  const loading = useAppSelector(rfpSelectors.selectRFPLoading);
  const error = useAppSelector(rfpSelectors.selectRFPError);
  const success = useAppSelector(rfpSelectors.selectRFPSuccess);

  const [description, setDescription] = useState("");
  const [editedRFP, setEditedRFP] = useState<GeneratedRFP | null>(null);

  const handleGenerate = () => {
    if (description.trim()) {
      dispatch(rfpActions.generateRFP(description.trim()));
    }
  };

  useEffect(() => {
    if (generatedRFP) {
      setEditedRFP(generatedRFP);
    }
  }, [generatedRFP]);

  const handleSaveRFP = (rfpData: GeneratedRFP) => {
    const finalRFPData = {
      ...rfpData,
      status: 'draft' as const,
      vendorsSent: [],
    };
    dispatch(rfpActions.createRFP(finalRFPData));
  };

  useEffect(() => {
    return () => {
      dispatch(rfpActions.clearErrors());
    };
  }, [dispatch]);


  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New RFP</h1>
        <p>Use AI to structure your procurement needs</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            RFP created successfully!
          </div>
        )}

        <RFPInputCard
          description={description}
          onDescriptionChange={setDescription}
          onGenerate={handleGenerate}
          loading={loading && !generatedRFP}
        />

        {editedRFP && (
          <RFPAIPreviewCard
            generatedRFP={editedRFP}
            onSave={handleSaveRFP}
            loading={loading}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default CreateRFP;
