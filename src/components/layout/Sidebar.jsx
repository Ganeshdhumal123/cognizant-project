import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FilePlus2, Files, UserCircle2, Activity, LogOut,
  Users, Gauge, FileBarChart2, Cpu, Settings, X, Menu,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initials } from '../../utils/formatters';

const APPLICANT_LINKS = [
  { to: '/applicant/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applicant/apply', label: 'Apply for Loan', icon: FilePlus2 },
  { to: '/applicant/applications', label: 'My Applications', icon: Files },
  { to: '/applicant/status', label: 'Application Status', icon: Activity },
  { to: '/applicant/profile', label: 'Profile', icon: UserCircle2 },
];

const ADMIN_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/applications', label: 'Applications', icon: Files },
  { to: '/admin/applicants', label: 'Applicants', icon: Users },
  { to: '/admin/risk-analysis', label: 'Risk Analysis', icon: Gauge },
  { to: '/admin/reports', label: 'Reports', icon: FileBarChart2 },
  { to: '/admin/model-performance', label: 'ML Model Performance', icon: Cpu },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ role = 'applicant', mobileOpen = false, onCloseMobile }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = role === 'admin' ? ADMIN_LINKS : APPLICANT_LINKS;

  // Tracks whether the sidebar has been closed via the X button.
  // This is separate from `mobileOpen` (which only drives the
  // slide-in/out behavior on small screens) so the X button also
  // works on desktop, where the sidebar is normally always visible.
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleClose = () => {
    setCollapsed(true);
    onCloseMobile?.();
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Open menu"
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 200,
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-navy-900)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <Menu size={18} />
      </button>
    );
  }

  return (
    <>
      <div className={`sidebar-backdrop ${mobileOpen ? 'show' : ''}`} onClick={onCloseMobile} />
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <img src="/logo.svg" alt="CrediFast" height={26} />
          <button
            className="modal-close"
            style={{ marginLeft: 'auto', color: '#fff' }}
            onClick={handleClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onCloseMobile}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
          <button className="sidebar-link" onClick={handleLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials(user?.name || 'U')}</div>
            <div className="sidebar-user-meta">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">{role}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}