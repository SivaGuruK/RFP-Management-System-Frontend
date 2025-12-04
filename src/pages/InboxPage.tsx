import EmailList from "../cards/EmailList";
import AppLayout from "../layouts/AppLayout";

const Inboxpage = () => {
  const emails = [
    {
      id: 1,
      from: "vendor1@supplierco.com",
      subject: "Proposal Submission - Office Equipment",
      body: "Dear Team, please find attached our proposal for your requirement.",
      received: "2025-12-03 10:45 AM",
      parsed: true,
    },
    {
      id: 2,
      from: "techline@techlinepro.com",
      subject: "Quotation for Laptop Purchase",
      body: "We are sharing the quotation for the laptop models requested.",
      received: "2025-12-02 04:20 PM",
      parsed: false,
    },
    {
      id: 3,
      from: "sales@infraequip.com",
      subject: "RFP Clarification Needed",
      body: "Kindly clarify the delivery timeline mentioned in your RFP document.",
      received: "2025-12-01 09:05 AM",
      parsed: true,
    },
    {
      id: 4,
      from: "support@vendortech.com",
      subject: "Follow-up: Proposal Status",
      body: "We wanted to follow up regarding the proposal status for your requirement.",
      received: "2025-11-30 02:55 PM",
      parsed: false,
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Email Inbox</h1>
        <p>View and manage vendor responses</p>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-6">Email Inbox</h2>
          <EmailList emails={emails} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Inboxpage;
