import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

/**
 * Shared shell for the applicant and admin areas: sidebar + content area.
 * `role` controls which nav items Sidebar renders.
 */
export default function DashboardLayout({ role = 'applicant', children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar role={role} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="app-main">
        <div className="navbar" style={{ display: 'none' }} />
        <button
          className="navbar-toggle"
          style={{ display: 'none' }}
          aria-hidden="true"
        />
        <div className="app-content">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'none',
              background: 'var(--color-white)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
            }}
            className="mobile-menu-btn"
          >
            <Menu size={18} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
