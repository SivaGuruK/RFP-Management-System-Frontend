import {type ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Eye } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  rfpsSent: number;
  responseRate: string;
}

interface RFP {
  _id: string;
  title: string;
  budget: number;
  status: string;
  vendorsSent: string[];
  createdAt: string;
}

//Vendor Columns
export const vendorColumns: ColumnDef<Vendor>[] = [
  { accessorKey: "name", header: "Vendor Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "rfpsSent", header: "RFPs Sent" },
  {
    accessorKey: "responseRate",
    header: "Response Rate",
    cell: (info) => (
      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
        {info.getValue<string>()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <button onClick={() => console.log("Edit", info.row.original.id)}>
          <Edit size={16} className="text-gray-600" />
        </button>
        <button onClick={() => console.log("Delete", info.row.original.id)}>
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>
    ),
  },
];

// RFP Columns
export const rfpColumns: ColumnDef<RFP>[] = [
  { accessorKey: "title", header: "RFP Title" },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: (info) => `$${info.getValue<number>().toLocaleString()}`,
  },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "vendorsSent",
    header: "Vendors Sent",
    cell: (info) => info.getValue<string[]>().length,
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: (info) => new Date(info.getValue<string>()).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <button onClick={() => console.log("View", info.row.original._id)}>
          <Eye size={16} className="text-gray-600" />
        </button>
        <button onClick={() => console.log("Edit", info.row.original._id)}>
          <Edit size={16} className="text-gray-600" />
        </button>
        <button onClick={() => console.log("Delete", info.row.original._id)}>
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>
    ),
  },
];