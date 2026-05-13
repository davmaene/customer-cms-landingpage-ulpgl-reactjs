import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Colors } from "../../utils/utils.colors";
import { APPNAME } from "../../utils/utils.constants";
import { useAuth } from "../../contexts/AuthContext";
import { FiHome, FiFileText, FiUsers, FiLayers, FiBookOpen, FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";

const FiHomeIcon = FiHome as any;
const FiFileTextIcon = FiFileText as any;
const FiUsersIcon = FiUsers as any;
const FiLayersIcon = FiLayers as any;
const FiBookOpenIcon = FiBookOpen as any;
const FiMenuIcon = FiMenu as any;
const FiXIcon = FiX as any;
const FiLogOutIcon = FiLogOut as any;
const FiUserIcon = FiUser as any;

interface SidebarLink {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const sidebarLinks: SidebarLink[] = [
  { to: "/dashboard", icon: <FiHomeIcon size={18} />, label: "Vue d'ensemble" },
  { to: "/dashboard/articles", icon: <FiFileTextIcon size={18} />, label: "Articles" },
  { to: "/dashboard/staff", icon: <FiUsersIcon size={18} />, label: "Personnel" },
  { to: "/dashboard/centres", icon: <FiLayersIcon size={18} />, label: "Centres" },
  { to: "/dashboard/domaines", icon: <FiBookOpenIcon size={18} />, label: "Domaines & Facultés" },
];

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/dashboard/login");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="dashboard-sidebar-header">
          <h4 className="dashboard-sidebar-title">{APPNAME}</h4>
          <span className="dashboard-sidebar-subtitle">Dashboard</span>
          <button
            className="dashboard-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
          >
            <FiXIcon size={22} />
          </button>
        </div>
        <nav className="dashboard-sidebar-nav">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              className={({ isActive }) =>
                `dashboard-sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="dashboard-sidebar-footer">
          {user && (
            <div className="dash-user-info">
              <div className="dash-user-avatar">
                <FiUserIcon size={16} />
              </div>
              <div className="dash-user-details">
                <span className="dash-user-name">{user.name}</span>
                <span className="dash-user-role">{user.role}</span>
              </div>
            </div>
          )}
          <button className="dashboard-sidebar-link dash-logout-btn" onClick={handleLogout}>
            <FiLogOutIcon size={18} />
            <span>Déconnexion</span>
          </button>
          <a href="/" className="dashboard-sidebar-link">
            <FiLogOutIcon size={18} />
            <span>Retour au site</span>
          </a>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="dashboard-menu-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <FiMenuIcon size={22} />
          </button>
          <h5 className="dashboard-topbar-title mb-0" style={{ color: Colors.primaryColor }}>
            Tableau de bord
          </h5>
          <div className="dash-topbar-right">
            {user && (
              <span className="dash-topbar-user">
                <FiUserIcon size={16} />
                {user.name}
              </span>
            )}
          </div>
        </header>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
