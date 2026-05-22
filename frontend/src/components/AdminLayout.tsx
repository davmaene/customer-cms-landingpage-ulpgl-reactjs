import React, { useState } from "react";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Colors } from "../utils/utils.colors";
import { APPNAME } from "../utils/utils.constants";
import { routes } from "../utils/utils.routes";
import { toast } from "react-toastify";
import {
  FiGrid,
  FiFileText,
  FiCalendar,
  FiActivity,
  FiClock,
  FiCheckSquare,
  FiMail,
  FiMessageSquare,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";

const I = (C: any) => C as any;
const GridI = I(FiGrid);
const FileI = I(FiFileText);
const CalI = I(FiCalendar);
const ActI = I(FiActivity);
const ClockI = I(FiClock);
const CheckI = I(FiCheckSquare);
const MailI = I(FiMail);
const MsgI = I(FiMessageSquare);
const UsersI = I(FiUsers);
const LogoutI = I(FiLogOut);
const MenuI = I(FiMenu);
const XI = I(FiX);
const HomeI = I(FiHome);

export const ADMIN_BASE = "/app/admin";

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Chargement...</div>;
  if (!user) return <Navigate to={routes.LOGIN} replace />;

  const handleLogout = () => {
    logout();
    toast.info("Déconnecté");
    navigate(routes.HOME);
  };

  const navItems = [
    { to: "", icon: <GridI size={18} />, label: "Vue d'ensemble" },
    { to: "/articles", icon: <FileI size={18} />, label: "Articles" },
    { to: "/events", icon: <CalI size={18} />, label: "Événements" },
    { to: "/activities", icon: <ActI size={18} />, label: "Activités" },
    { to: "/schedules", icon: <ClockI size={18} />, label: "Horaires" },
    ...(isAdmin
      ? [
          { to: "/pending", icon: <CheckI size={18} />, label: "À valider" },
          { to: "/newsletter", icon: <MailI size={18} />, label: "Newsletter" },
          { to: "/messages", icon: <MsgI size={18} />, label: "Messages" },
          { to: "/users", icon: <UsersI size={18} />, label: "Utilisateurs" },
        ]
      : []),
  ];

  return (
    <div data-testid="admin-layout" style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
      {/* Sidebar */}
      <aside
        data-testid="admin-sidebar"
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
        style={{
          width: 250,
          background: Colors.primaryColor,
          color: "white",
          padding: "22px 16px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{APPNAME}</div>
            <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: 1 }}>ADMIN</div>
          </div>
          <button
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            style={{ background: "transparent", border: "none", color: "white", display: "none", cursor: "pointer" }}
            aria-label="Fermer"
          >
            <XI size={22} />
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              end={it.to === ""}
              to={`${ADMIN_BASE}${it.to}`}
              onClick={() => setSidebarOpen(false)}
              data-testid={`admin-nav-${(it.to || "overview").replace(/^\//, "")}`}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 14px",
                marginBottom: 4,
                borderRadius: 6,
                color: "white",
                textDecoration: "none",
                background: isActive ? "rgba(255,255,255,0.16)" : "transparent",
                fontWeight: isActive ? 600 : 400,
                fontSize: 14,
                transition: "background 0.2s",
              })}
            >
              {it.icon}
              <span>{it.label}</span>
            </NavLink>
          ))}
        </nav>

        <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.15)", marginTop: 14 }}>
          <div style={{ fontSize: 13, marginBottom: 4 }}>
            <b>{user.name}</b>
          </div>
          <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 12 }}>
            {isAdmin ? "Super Admin" : `Publieur · ${user.faculty?.name || "—"}`}
          </div>
          <Link
            to={routes.HOME}
            style={{ display: "flex", alignItems: "center", gap: 8, color: "white", textDecoration: "none", fontSize: 13, padding: "8px 0", opacity: 0.85 }}
          >
            <HomeI size={14} /> Voir le site
          </Link>
          <button
            data-testid="admin-logout"
            onClick={handleLogout}
            style={{
              marginTop: 6, background: "rgba(255,255,255,0.12)", color: "white", border: "none",
              padding: "10px 12px", borderRadius: 6, cursor: "pointer", width: "100%",
              display: "flex", alignItems: "center", gap: 8, fontSize: 14,
            }}
          >
            <LogoutI size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="admin-sidebar-overlay"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "none" }}
        />
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header
          className="admin-topbar"
          style={{
            background: "white", padding: "14px 24px", borderBottom: "1px solid #e6e8ee",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "sticky", top: 0, zIndex: 50,
          }}
        >
          <button
            data-testid="admin-sidebar-toggle"
            onClick={() => setSidebarOpen(true)}
            className="admin-sidebar-toggle"
            style={{ background: "transparent", border: "none", padding: 6, cursor: "pointer", display: "none" }}
            aria-label="Menu"
          >
            <MenuI size={22} />
          </button>
          <h1 style={{ margin: 0, color: Colors.primaryColor, fontSize: 18, fontWeight: 700 }}>
            Tableau de bord
          </h1>
          <div style={{ fontSize: 13, color: "#666" }}>{user.name}</div>
        </header>

        <main style={{ padding: "24px 24px 40px", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
