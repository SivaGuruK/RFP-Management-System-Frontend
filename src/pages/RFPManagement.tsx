import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { DataGridTable } from "../ui/DataGridTable";
import { rfpColumns } from "../utils/ColumnDef";

interface RFP {
  _id: string;
  title: string;
  budget: number;
  status: string;
  vendorsSent: string[];
  createdAt: string;
}

const RFPManagement = () => {
  const [rfps] = useState<RFP[]>([
    { 
      _id: "1", 
      title: "Website Redesign Project", 
      budget: 50000, 
      status: "Draft", 
      vendorsSent: ["Vendor A", "Vendor B", "Vendor C"],
      createdAt: "2024-01-15"
    },
    { 
      _id: "2", 
      title: "Mobile App Development", 
      budget: 75000, 
      status: "Sent", 
      vendorsSent: ["Vendor A", "Vendor D"],
      createdAt: "2024-01-20"
    },
  ]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">RFP Management</h1>
          <p className="text-gray-600 mt-1">Manage your Requests for Proposals</p>
        </div>
        
        <DataGridTable<RFP>
          data={rfps}
          columns={rfpColumns}
          searchKey="title"
          addButton={{ 
            label: "Create New RFP", 
            onClick: () => console.log("Open RFP creation modal") 
          }}
        />
      </div>
    </AppLayout>
  );
};

export default RFPManagement;