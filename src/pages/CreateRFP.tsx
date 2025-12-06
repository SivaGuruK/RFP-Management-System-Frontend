import { useEffect, useState } from "react";
import RFPInputCard from "../cards/RFPInputCard";
import RFPAIPreviewCard from "../cards/RFPAIPreviewCard";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../store";
import { rfpActions } from "../store/actions/rfp.actions";
import { rfpSelectors } from "../store/selectors/rfp.selector";
import {type GeneratedRFP } from "../store/types/rfp.types";
import { useToast } from "../ui/Toast";

const CreateRFP = () => {
  const { showToast } = useToast();

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

useEffect(() => {
  if (error) showToast(error, "error");
  if (success) showToast("RFP created successfully!", "success");
}, [error, success]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New RFP</h1>
        <p>Use AI to structure your procurement needs</p>
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
