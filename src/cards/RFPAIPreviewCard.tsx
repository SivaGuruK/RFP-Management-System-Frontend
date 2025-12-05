import React, { useState, useEffect } from "react";
import { AlertCircle, Save, Loader2, Plus, Trash2 } from "lucide-react";
import type { GeneratedRFP, RFPItem } from "../store/types/rfp.types";

interface RFPAIPreviewCardProps {
  generatedRFP: GeneratedRFP;
  onSave: (rfpData: GeneratedRFP) => void;
  loading?: boolean;
}

const RFPAIPreviewCard: React.FC<RFPAIPreviewCardProps> = ({
  generatedRFP,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState<GeneratedRFP>(generatedRFP);

  useEffect(() => {
    setFormData(generatedRFP);
  }, [generatedRFP]);

  const handleFieldChange = (field: keyof GeneratedRFP, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (index: number, field: keyof RFPItem, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: "",
          quantity: 1,
          specifications: "",
        },
      ],
    }));
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <AlertCircle size={20} className="text-blue-600" />
          AI-Generated RFP Preview (Editable)
        </h3>
      </div>

      <div className="bg-white rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RFP Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter RFP title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Describe your procurement needs"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget ($)
            </label>
            <input
              type="number"
              value={formData.budget || ""}
              onChange={(e) =>
                handleFieldChange("budget", e.target.value ? Number(e.target.value) : undefined)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Timeline
            </label>
            <input
              type="text"
              value={formData.deliveryTimeline || ""}
              onChange={(e) => handleFieldChange("deliveryTimeline", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="30 days"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Terms
            </label>
            <input
              type="text"
              value={formData.paymentTerms || ""}
              onChange={(e) => handleFieldChange("paymentTerms", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Net 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warranty Required
            </label>
            <input
              type="text"
              value={formData.warrantyRequired || ""}
              onChange={(e) => handleFieldChange("warrantyRequired", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="At least 1 year"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Items *
            </label>
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Item {index + 1}
                  </span>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Laptop"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", Number(e.target.value))
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="20"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Specifications *
                    </label>
                    <input
                      type="text"
                      value={item.specifications}
                      onChange={(e) =>
                        handleItemChange(index, "specifications", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="16GB RAM"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t pt-6">
          <button
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.description || formData.items.length === 0}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save RFP as Draft
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RFPAIPreviewCard;