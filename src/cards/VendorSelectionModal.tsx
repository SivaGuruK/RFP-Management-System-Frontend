import React, { useState, useEffect } from "react";
import { X, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { Vendor } from "../store/types/vendor.types";

interface VendorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendors: Vendor[];
  onSendEmails: (selectedVendorIds: string[]) => void;
  loading?: boolean;
  rfpTitle: string;
}

const VendorSelectionModal: React.FC<VendorSelectionModalProps> = ({
  isOpen,
  onClose,
  vendors,
  onSendEmails,
  loading = false,
  rfpTitle,
}) => {
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSelectedVendors(new Set());
      setSearchTerm("");
    }
  }, [isOpen]);

  const toggleVendor = (vendorId: string) => {
    setSelectedVendors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(vendorId)) {
        newSet.delete(vendorId);
      } else {
        newSet.add(vendorId);
      }
      return newSet;
    });
  };

  const toggleAll = () => {
    if (selectedVendors.size === filteredVendors.length) {
      setSelectedVendors(new Set());
    } else {
      setSelectedVendors(new Set(filteredVendors.map((v) => v._id)));
    }
  };

  const handleSend = () => {
    if (selectedVendors.size > 0) {
      onSendEmails(Array.from(selectedVendors));
    }
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Send RFP to Vendors</h2>
            <p className="text-sm text-gray-600 mt-1">{rfpTitle}</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search vendors by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {filteredVendors.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                {searchTerm ? "No vendors found matching your search" : "No vendors available"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedVendors.size === filteredVendors.length && filteredVendors.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label className="ml-3 font-medium text-gray-700">
                  Select All ({filteredVendors.length})
                </label>
              </div>
              {filteredVendors.map((vendor) => (
                <div
                  key={vendor._id}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedVendors.has(vendor._id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleVendor(vendor._id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedVendors.has(vendor._id)}
                    onChange={() => toggleVendor(vendor._id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mt-1"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                      {selectedVendors.has(vendor._id) && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{vendor.email}</p>
                    {vendor.phone && (
                      <p className="text-sm text-gray-500 mt-1">{vendor.phone}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {selectedVendors.size} vendor{selectedVendors.size !== 1 ? "s" : ""} selected
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={loading || selectedVendors.size === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={18} />
                  Send RFP ({selectedVendors.size})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSelectionModal;