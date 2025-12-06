import React from "react";
import { X } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { type FullRFP } from "../store/types/rfp.types";

const Modal = ({ children, onClose, wide = false }: { children: React.ReactNode; onClose: () => void; wide?: boolean }) => {  
  return (
    <div 
      className="fixed inset-0 flex justify-center items-center p-4" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999999 
      }}
      onClick={onClose}
    >
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
};

const ViewRFPModal = ({ rfp, onClose }: { rfp: FullRFP; onClose: () => void }) => {
  
  return (
    <Modal onClose={onClose} wide>
      <div className="pr-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">RFP Details</h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-lg space-y-4">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Title</span>
              <p className="text-gray-900 font-medium mt-1">{rfp.title}</p>
            </div>
            
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Description</span>
              <p className="text-gray-700 mt-1 leading-relaxed">{rfp.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Budget</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₹{rfp.budget?.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</span>
              <div className="mt-2">
                <StatusBadge status={rfp.status} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Delivery Timeline</span>
              <p className="text-gray-900 font-medium mt-2">{rfp.deliveryTimeline}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Payment Terms</span>
              <p className="text-gray-900 font-medium mt-2">{rfp.paymentTerms}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Warranty</span>
              <p className="text-gray-900 font-medium mt-2">{rfp.warrantyRequired}</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
            <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Vendors Sent</span>
            <p className="text-2xl font-bold text-green-700 mt-1">{rfp.vendorsSent.length}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{rfp.items.length}</span>
              Items Requested
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {rfp.items.map((item, index) => (
                <div key={item._id || index} className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900">
                      <span className="text-blue-600 mr-2">{index + 1}.</span>
                      {item.name}
                    </span>
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.specifications}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t border-gray-200 space-y-1">
            <p><strong>Created:</strong> {new Date(rfp.createdAt).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
            <p><strong>Last Updated:</strong> {new Date(rfp.updatedAt).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRFPModal;