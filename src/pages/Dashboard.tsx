import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../cards/StatsCard';
import RecentRFPs from '../cards/RecentRFPs';
import { FileText, Clock, Users, BarChart3 } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { useAppDispatch, useAppSelector } from '../store';
import { rfpActions } from '../store/actions/rfp.actions';
import { vendorActions } from '../store/actions/vendor.actions';
import { rfpSelectors } from '../store/selectors/rfp.selector';
import { vendorSelectors } from '../store/selectors/vendor.selector';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dashboardStats = useAppSelector(rfpSelectors.selectDashboardStats);
  const allRFPs = useAppSelector(rfpSelectors.selectAllRFPs);
  const vendors = useAppSelector(vendorSelectors.selectAllVendors);
  const loading = useAppSelector(rfpSelectors.selectRFPLoading);

  useEffect(() => {
    dispatch(rfpActions.getDashboardStats());
    dispatch(rfpActions.getAllRFPs());
    dispatch(vendorActions.getAllVendors());
  }, [dispatch]);

  const recentRFPs = [...allRFPs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

    const mappedRFPs = recentRFPs.map((rfp) => ({
  id: rfp._id,
  title: rfp.title,
  status: rfp.status,
  budget: rfp.budget,
  vendors: rfp.vendorsSent?.length || 0,
  items: rfp.items?.length || 0,
  created: new Date(rfp.createdAt).toLocaleDateString(),
}));


  const handleCreateRFP = () => {
    navigate('/create-rfp');
  };

  if (loading && !dashboardStats) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading dashboard...</span>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Overview of your procurement activities</p>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm mt-2">
            <h2 className="text-lg font-semibold text-blue-700">About This Application</h2>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              This AI-powered RFP (Request For proposal) Management System automates procurement end-to-end. You can create 
              structured RFPs from natural language, manage vendors, send RFPs via email, receive and 
              auto-parse incoming vendor responses using AI, and compare proposals with intelligent 
              recommendations to make faster, data-driven decisions.
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            label="Total RFPs"
            value={dashboardStats?.total || 0}
            icon={<FileText className="w-10 h-10 text-blue-500" />}
          />
          <StatsCard
            label="Pending (Draft)"
            value={dashboardStats?.draft || 0}
            icon={<Clock className="w-10 h-10 text-orange-500" />}
          />
          <StatsCard
            label="RFP's Sent"
            value={dashboardStats?.sent || 0}
            icon={<BarChart3 className="w-10 h-10 text-purple-500" />}
          />
          <StatsCard
            label="Total Vendors"
            value={vendors.length}
            icon={<Users className="w-10 h-10 text-green-500" />}
          />
        </div>

        <RecentRFPs rfps={mappedRFPs} onCreate={handleCreateRFP} />
      </div>
    </AppLayout>
  );
}