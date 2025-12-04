import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { DataGridTable } from "../ui/DataGridTable";
import { vendorColumns } from "../utils/ColumnDef";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  rfpsSent: number;
  responseRate: string;
}

const VendorsManagement = () => {
  const [vendors] = useState<Vendor[]>([
    { id: "1", name: "Vendor A", email: "a@mail.com", phone: "1234567890", rfpsSent: 5, responseRate: "80%" },
    { id: "2", name: "Vendor B", email: "b@mail.com", phone: "0987654321", rfpsSent: 3, responseRate: "60%" },
  ]);

  return (
    <AppLayout>
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Vendor Management</h1>
            <p>Manage your vendor relationships</p>
            <DataGridTable<Vendor>
            data={vendors}
            columns={vendorColumns}
            searchKey="name"
            addButton={{ label: "Add Vendor", onClick: () => console.log("Open modal") }}
            />;               
        </div>
    </AppLayout>
  );
};

export default VendorsManagement;
