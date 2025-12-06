import Sidebar from "../components/Sidebar";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 px-6 md:px-20 py-4 mt-16 md:mt-3 md:ml-54">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
