import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiPlus,
  FiMail,
  FiUsers,
  FiBarChart2,
  FiFileText
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <FiBarChart2 />, to: "/dashboard" },
    { label: "Create RFP", icon: <FiPlus />, to: "/create-rfp" },
    { label: "All RFPs", icon: <FiFileText />, to: "/rfps" },
    { label: "Vendors", icon: <FiUsers />, to: "/vendors" },
    { label: "Compare Proposals", icon: <FiBarChart2 />, to: "/compare" },
    { label: "Inbox", icon: <FiMail />, to: "/inbox" },
  ];

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white shadow z-40">
        <h1 className="text-xl font-bold text-blue-600">RFP Manager</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 pt-16 md:pt-6
            transform transition-transform duration-300
            w-64 p-6
            ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
        <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-blue-600">RFP Manager</h1>
            <p className="text-sm text-gray-500 py-2">AI-Powered Procurement</p>
        </div>

        <nav className="flex flex-col gap-3 mt-4">
            {menuItems.map((item) => (
            <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
                }
                onClick={() => setOpen(false)}
            >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
            </NavLink>
            ))}
        </nav>
        </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
