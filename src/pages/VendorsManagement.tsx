import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "../store";
import { vendorActions } from "../store/actions/vendor.actions";
import { vendorSelectors } from "../store/selectors/vendor.selector";
import { type Vendor } from "../store/types/vendor.types";
import { Loader2, Plus, Edit, Trash2, X, Search, UserCircle, User, Mail, Phone } from "lucide-react";

const VendorManagement = () => {
  const dispatch = useAppDispatch();

  const vendors = useAppSelector(vendorSelectors.selectAllVendors);
  const loading = useAppSelector(vendorSelectors.selectVendorLoading);
  const error = useAppSelector(vendorSelectors.selectVendorError);
  const success = useAppSelector(vendorSelectors.selectVendorSuccess);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update" | "delete">("create");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactPerson: "",
  });

  useEffect(() => {
    dispatch(vendorActions.getAllVendors(searchTerm || undefined));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        closeModal();
        dispatch(vendorActions.clearErrors());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const openModal = (type: "create" | "update" | "delete", vendor: Vendor | null = null) => {
    setModalType(type);
    setSelectedVendor(vendor);
    dispatch(vendorActions.clearErrors());

    if (type === "create") {
      setFormData({ name: "", email: "", phone: "", contactPerson: "" });
    } else if (type === "update" && vendor) {
      setFormData({
        name: vendor.name,
        email: vendor.email,
        phone: vendor.phone,
        contactPerson: vendor.contactPerson,
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVendor(null);
    setFormData({ name: "", email: "", phone: "", contactPerson: "" });
    dispatch(vendorActions.clearErrors());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === "create") {
      dispatch(vendorActions.createVendor(formData));
    } else if (modalType === "update" && selectedVendor) {
      dispatch(vendorActions.updateVendor(selectedVendor._id, formData));
    }
  };

  const handleDelete = () => {
    if (selectedVendor) {
      dispatch(vendorActions.deleteVendor(selectedVendor._id));
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Vendor Management</h1>
            <p className="text-gray-600">Manage your vendor database efficiently</p>
          </div>

          {success && !showModal && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl">
              {success}
            </div>
          )}
          {error && !showModal && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 mr-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search vendors by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
            </div>

            <button
              onClick={() => openModal("create")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Vendor
            </button>
          </div>

          {loading && !showModal ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              <span className="ml-4 text-xl text-gray-600">Loading vendors...</span>
            </div>
          ) : vendors.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <UserCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No vendors found</h3>
              <p className="text-gray-500 mb-6">Get started by adding your first vendor</p>
              <button
                onClick={() => openModal("create")}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Your First Vendor
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <div
                  key={vendor._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <UserCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("update", vendor)}
                        className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all"
                        title="Update vendor"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("delete", vendor)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                        title="Delete vendor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">{vendor.name}</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{vendor.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm truncate">{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{vendor.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {modalType === "create" && "Create New Vendor"}
                    {modalType === "update" && "Update Vendor"}
                    {modalType === "delete" && "Delete Vendor"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">
                    {success}
                  </div>
                )}

                {modalType === "delete" ? (
                  <div>
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to delete <strong>{selectedVendor?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        disabled={loading}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-5 h-5" />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter vendor name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="vendor@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 98765 40000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Siva K"
                        required
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        disabled={loading}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            {modalType === "create" ? <Plus className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                            {modalType === "create" ? "Create" : "Update"} Vendor
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default VendorManagement;