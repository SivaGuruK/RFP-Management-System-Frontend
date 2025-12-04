import React from "react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {

  let colorClass = "bg-gray-100 text-gray-800";

  switch (status.toLowerCase()) {
    case "pending":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "approved":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "rejected":
      colorClass = "bg-red-100 text-red-800";
      break;
    case "in progress":
      colorClass = "bg-blue-100 text-blue-800";
      break;
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
