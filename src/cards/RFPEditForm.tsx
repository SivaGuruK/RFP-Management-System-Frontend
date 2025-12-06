import React, { useState } from "react";
import { rfpAPI } from "../services/api";
import { X } from "lucide-react";
import { type FullRFP } from "../store/types/rfp.types";

const Modal = ({ children, onClose, wide = false }: { children: React.ReactNode; onClose: () => void; wide?: boolean }) => (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4" onClick={onClose}>
    <div 
      className={`bg-white p-6 rounded-xl ${wide ? 'w-[800px] max-h-[90vh]' : 'w-[600px] max-h-[85vh]'} relative shadow-2xl overflow-y-auto`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>
      {children}
    </div>
  </div>
);

export const EditRFPModal = ({ rfp, onClose, onSave }: { rfp: FullRFP; onClose: () => void; onSave: () => void }) => {
  const [formData, setFormData] = useState({
    title: rfp.title,
    description: rfp.description,
    budget: rfp.budget,
    deliveryTimeline: rfp.deliveryTimeline || '',
    paymentTerms: rfp.paymentTerms || '',
    warrantyRequired: rfp.warrantyRequired || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await rfpAPI.updateRFP(rfp._id, formData);
      alert('RFP updated successfully!');
      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating RFP:', error);
      alert('Failed to update RFP. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (rfp.status !== "draft") {
    return (
      <Modal onClose={onClose}>
        <div className="pr-8">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Cannot Edit RFP</h2>
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <p className="text-red-800 mb-2">
              This RFP cannot be edited because its status is <strong className="uppercase">{rfp.status}</strong>.
            </p>
            <p className="text-red-700 text-sm">
              Only RFPs with <strong>"draft"</strong> status can be edited.
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose} wide>
      <div className="pr-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit RFP</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Timeline *</label>
              <input
                type="text"
                required
                value={formData.deliveryTimeline}
                onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 30 days"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Terms *</label>
              <input
                type="text"
                required
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Net 30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Warranty Required *</label>
            <input
              type="text"
              required
              value={formData.warrantyRequired}
              onChange={(e) => setFormData({ ...formData, warrantyRequired: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1 year"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Items ({rfp.items.length}) - Read Only
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {rfp.items.map((item, index) => (
                  <div key={item._id || index} className="text-sm flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="font-medium text-gray-800">
                      {index + 1}. {item.name}
                    </span>
                    <span className="text-gray-600 text-xs bg-white px-2 py-1 rounded">
                      Qty: {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};