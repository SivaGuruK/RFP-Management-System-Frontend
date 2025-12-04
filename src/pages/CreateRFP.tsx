import RFPInputCard from "../cards/RFPInputCard"
import RFPAIPreviewCard from "../cards/RFPAIPreviewCard";
import AppLayout from "../layouts/AppLayout";

const CreateRFP = () => {
  const items = ["20x Laptops (16GB RAM)", "15x Monitors (27-inch)"];

  return (
    <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New RFP</h1>
      <p>Use AI to structure your procurement needs</p>
      <RFPInputCard onGenerate={() => console.log("Generate clicked")} />
      <RFPAIPreviewCard
        totalBudget="$50,000"
        deliveryTimeline="30 days"
        paymentTerms="Net 30"
        warranty="1 year minimum"
        items={items}
      />
    </div>
    </AppLayout>
  );
};

export default CreateRFP;
