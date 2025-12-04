import React from "react";
import { Search, Plus } from "lucide-react";

interface VendorsSearchBarProps {
  onAdd: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const VendorsSearchBar: React.FC<VendorsSearchBarProps> = ({ onAdd, searchValue, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search vendors..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <Plus size={18} />
        Add Vendor
      </button>
    </div>
  );
};

export default VendorsSearchBar;
