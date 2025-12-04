import React, { useMemo } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef, flexRender } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  rfpsSent: number;
  responseRate: string;
}

interface VendorsTableProps {
  data: Vendor[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const VendorsTable: React.FC<VendorsTableProps> = ({ data, onEdit, onDelete }) => {
  const columns = useMemo<ColumnDef<Vendor, any>[]>(
    () => [
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
            <button
              onClick={() => onEdit(info.row.original.id)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Edit size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(info.row.original.id)}
              className="p-2 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const table = useReactTable<Vendor>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 p-6">
      <table className="min-w-full">
        <thead className="border-b border-gray-200">
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <th
                key={header.id}
                className="text-left py-3 px-4 font-semibold text-sm text-gray-700"
                >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
            ))}
            </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4 px-4 text-gray-600">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorsTable;
