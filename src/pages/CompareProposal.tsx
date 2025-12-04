import AIComparison from "../cards/AIComparison";
import ComparisonCard from "../cards/ComparisonCard";
import AppLayout from "../layouts/AppLayout";

const proposals = [
  {
    id: 1,
    vendor: "TechSupply Co.",
    score: 92,
    price: 48500,
    delivery: "25 days",
    warranty: "2-year",
    strengths: ["Best price-to-value ratio", "Extended 2-year warranty"],
  },
  {
    id: 2,
    vendor: "OfficeEquip Inc.",
    score: 88,
    price: 50000,
    delivery: "20 days",
    warranty: "1-year",
    strengths: ["Fastest delivery", "Established vendor relationship"],
  },
   {
    id: 1,
    vendor: "TechSupply Co.",
    score: 92,
    price: 48500,
    delivery: "25 days",
    warranty: "2-year",
    strengths: ["Best price-to-value ratio", "Extended 2-year warranty"],
  },
  {
    id: 2,
    vendor: "OfficeEquip Inc.",
    score: 88,
    price: 50000,
    delivery: "20 days",
    warranty: "1-year",
    strengths: ["Fastest delivery", "Established vendor relationship"],
  },
];

const CompareProposal = () => {
  const handleSelect = (id: number | string) => {
    console.log("Selected vendor:", id);
  };

  return (
    <AppLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Proposal Comparison</h1>
      <p>AI-assisted proposal evaluation</p>      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Proposal Comparison - Office Equipment Procurement</h2>
        <AIComparison
          vendor="TechSupply Co."
          price={48500}
          warranty="2-year"
          delivery="25 days"
          score={92}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proposals.map((proposal) => (
            <ComparisonCard key={proposal.id} proposal={proposal} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default CompareProposal;
