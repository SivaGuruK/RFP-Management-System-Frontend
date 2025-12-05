import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { DataGridTable } from "../ui/DataGridTable";
import { vendorColumns } from "../utils/ColumnDef";
import { useAppDispatch, useAppSelector } from "../store";
import { vendorActions } from "../store/actions/vendor.actions";
import { vendorSelectors } from "../store/selectors/vendor.selector";
import { type Vendor } from "../store/types/vendor.types";
import { Loader2, Plus, X } from "lucide-react";

const VendorManagement = () => {
  const dispatch = useAppDispatch();

  const vendors = useAppSelector(vendorSelectors.selectAllVendors);
  const loading = useAppSelector(vendorSelectors.selectVendorLoading);
  const error = useAppSelector(vendorSelectors.selectVendorError);
  const success = useAppSelector(vendorSelectors.selectVendorSuccess);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactPerson: "",
  });

  useEffect(() => {
    dispatch(vendorActions.getAllVendors(searchTerm || undefined));
  }, [dispatch, searchTerm ,setSearchTerm ]);

  useEffect(() => {
    if (success) {
      setShowAddModal(false);
      setEditingVendor(null);
      setFormData({ name: "", email: "", phone: "", contactPerson: "" });
      dispatch(vendorActions.clearErrors());
    }
  }, [success, dispatch]);

  const handleAddVendor = () => {
    setEditingVendor(null);
    setFormData({ name: "", email: "", phone: "", contactPerson: "" });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingVendor) {
      dispatch(vendorActions.updateVendor(editingVendor._id, formData));
    } else {
      dispatch(vendorActions.createVendor(formData));
    }
  };

  const handleRowAction = (action: string, row: Vendor) => {
    switch (action) {
      case "edit":
        setEditingVendor(row);
        setFormData({
          name: row.name,
          email: row.email,
          phone: row.phone,
          contactPerson: row.contactPerson,
        });
        setShowAddModal(true);
        break;
      case "delete":
        if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
          dispatch(vendorActions.deleteVendor(row._id));
        }
        break;
      case "view":
        console.log("View vendor:", row);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingVendor(null);
    setFormData({ name: "", email: "", phone: "", contactPerson: "" });
    dispatch(vendorActions.clearErrors());
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Vendor Management</h1>
            <p className="text-gray-600 mt-1">Manage your vendor database</p>
          </div>
        </div>

        {error && !showAddModal && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && !showAddModal && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            Vendor {editingVendor ? "updated" : "created"} successfully!
          </div>
        )}

        {loading && !showAddModal ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading vendors...</span>
          </div>
        ) : (
          <DataGridTable<Vendor>
            data={vendors}
            columns={vendorColumns}
            searchKey="name"
            addButton={{
              label: "Add New Vendor",
              onClick: handleAddVendor,
            }}
            onRowAction={handleRowAction}
          />
        )}

        {!loading && vendors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 mb-4">No vendors found</p>
            <button
              onClick={handleAddVendor}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Your First Vendor
            </button>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {editingVendor ? "Edit Vendor" : "Add New Vendor"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vendor Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter vendor name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="vendor@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={18} />
                        {editingVendor ? "Update" : "Add"} Vendor
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default VendorManagement;