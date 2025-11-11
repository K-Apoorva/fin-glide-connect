import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import ProfessionalDashboard from './ProfessionalDashboard';
import HighNetworthDashboard from './HighNetworthDashboard';
import RetireeDashboard from './RetireeDashboard';

const DashboardFactory = () => {
  const { user } = useAuth();

  if (!user) return null;

  const dashboards = {
    student: StudentDashboard,
    professional: ProfessionalDashboard,
    high_networth: HighNetworthDashboard,
    retiree: RetireeDashboard,
    admin: ProfessionalDashboard // Fallback for admin
  };

  const DashboardComponent = dashboards[user.role];
  return <DashboardComponent user={user} />;
};

export default DashboardFactory;
