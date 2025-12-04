import { useState } from "react";
import VendorsSearchBar from "../ui/VendorsSearchBar";
import VendorsTable from "../ui/VendorsTable";
import AppLayout from "../layouts/AppLayout";

const VendorsManagement = () => {
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([
    { id: "1", name: "Vendor A", email: "a@mail.com", phone: "1234567890", rfpsSent: 5, responseRate: "80%" },
    { id: "2", name: "Vendor B", email: "b@mail.com", phone: "0987654321", rfpsSent: 3, responseRate: "60%" },
  ]);

  const handleAddVendor = () => {
    console.log("Open add vendor modal");
  };

  const handleEditVendor = (id: string) => {
    console.log("Edit vendor", id);
  };

  const handleDeleteVendor = (id: string) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Vendor Management</h1>
            <p>Manage your vendor relationships</p>
        <VendorsSearchBar onAdd={handleAddVendor} searchValue={search} onSearchChange={setSearch} />
        <VendorsTable data={filteredVendors} onEdit={handleEditVendor} onDelete={handleDeleteVendor} />
        </div>
    </AppLayout>
  );
};

export default VendorsManagement;
