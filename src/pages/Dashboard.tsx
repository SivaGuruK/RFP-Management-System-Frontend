import StatsCard from '../cards/StatsCard';
import RecentRFPs from '../cards/RecentRFPs';
import { FileText, Clock, Users, BarChart3 } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';

export default function Dashboard() {
  const rfps = [
    {
      id: "1",
      title: "Office Supplies",
      status: "Pending",
      budget: 10000,
      vendors: 4,
      responses: 2,
      created: "2025-12-01",
    },
    {
      id: "2",
      title: "Office Supplies",
      status: "Completed",
      budget: 10000,
      vendors: 4,
      responses: 2,
      created: "2025-12-01",
    },
    {
      id: "3",
      title: "Office Supplies",
      status: "In Progress",
      budget: 10000,
      vendors: 4,
      responses: 2,
      created: "2025-12-01",
    },
  ];

  return (
    <AppLayout>
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Overview of your procurement activities</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard label="Active RFPs" value={12} icon={<FileText className="w-10 h-10 text-blue-500" />} />
                <StatsCard label="Pending Responses" value={8} icon={<Clock className="w-10 h-10 text-orange-500" />} />
                <StatsCard label="Total Vendors" value={24} icon={<Users className="w-10 h-10 text-green-500" />} />
                <StatsCard label="Avg. Response Time" value="3.2d" icon={<BarChart3 className="w-10 h-10 text-purple-500" />} />
            </div>
            
            <RecentRFPs rfps={rfps} onCreate={() => console.log("Create RFP clicked")} />
        </div>
    </AppLayout>
  );
}
