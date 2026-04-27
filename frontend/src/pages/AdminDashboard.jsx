import { useState } from 'react';
import { Users, UserCog, Activity, Settings, LogOut, BarChart3, Menu, X } from 'lucide-react';
import UsersManagement from './dashboard/UsersManagement';
import PatientsManagement from './dashboard/PatientsManagement';
import ReportsAnalytics from './dashboard/ReportsAnalytics';
import SystemSettings from './dashboard/SystemSettings';
import '../styles/dashboard.css';
import { useLogout } from "../hooks/authApi";
import { useNavigate } from "react-router-dom"; 

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const logout = useLogout(); 
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'patients', label: 'Patients', icon: UserCog },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersManagement />;
      case 'patients':
        return <PatientsManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <UsersManagement />;
    }
  };

  const handleLogout = () => {
    logout();     
    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }     
  };  


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Activity className="logo-icon" />
            <span className="logo-text">MediCare Admin</span>
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <Icon className="nav-icon" size={20} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut className="nav-icon" size={20} />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
