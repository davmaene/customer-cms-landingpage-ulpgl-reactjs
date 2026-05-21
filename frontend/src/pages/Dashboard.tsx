import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiDel, apiGet, apiPost, apiPut } from "../utils/api";
import { Colors } from "../utils/utils.colors";
import { routes } from "../utils/utils.routes";
import { toast } from "react-toastify";
import { FiLogOut, FiPlus, FiCheckCircle, FiXCircle, FiEdit2, FiTrash2, FiMail, FiUsers, FiClock, FiUserPlus } from "react-icons/fi";
import { ImageUpload } from "../components/subcomponents/ImageUpload";
import { RichEditor } from "../components/subcomponents/RichEditor";

const Icon = (C: any) => C as any;
const LogoutI = Icon(FiLogOut);
const PlusI = Icon(FiPlus);
const CheckI = Icon(FiCheckCircle);
const XI = Icon(FiXCircle);
const EditI = Icon(FiEdit2);
const TrashI = Icon(FiTrash2);
const MailI = Icon(FiMail);
const UsersI = Icon(FiUsers);
const ClockI = Icon(FiClock);
const UserPlusI = Icon(FiUserPlus);

type Tab = "overview" | "articles" | "events" | "activities" | "pending" | "newsletter" | "messages" | "users";

export const Dashboard: React.FC = () => {
  const { user, logout, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<any>({});
  const [contents, setContents] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [showForm, setShowForm] = useState<null | "article" | "event" | "activity">(null);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({ title: "", excerpt: "", content: "", category: "", coverImage: "", eventDate: "", location: "" });
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState<any>({ name: "", email: "", password: "", role: "faculty_publisher", facultyId: "" });

  useEffect(() => {
    if (!loading && !user) navigate(routes.LOGIN);
  }, [user, loading, navigate]);

  const refreshAll = async () => {
    if (!user) return;
    try {
      const [s, all, fac] = await Promise.all([
        apiGet("/dashboard/stats"),
        apiGet("/contents/admin"),
        apiGet("/faculties"),
      ]);
      setStats(s);
      setContents(all.items);
      setFaculties(fac.items);
      if (isAdmin) {
        const [p, n, m, u] = await Promise.all([
          apiGet("/contents/admin", { status: "pending" }),
          apiGet("/newsletter"),
          apiGet("/contact"),
          apiGet("/users"),
        ]);
        setPending(p.items);
        setNewsletters(n.items);
        setMessages(m.items);
        setUsers(u.items);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Chargement...</div>;
  if (!user) return <Navigate to={routes.LOGIN} replace />;

  const handleLogout = () => {
    logout();
    toast.info("Déconnecté");
    navigate(routes.HOME);
  };

  const openCreate = (type: "article" | "event" | "activity") => {
    setEditing(null);
    setForm({ title: "", excerpt: "", content: "", category: "", coverImage: "", eventDate: "", location: "" });
    setShowForm(type);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      title: item.title,
      excerpt: item.excerpt || "",
      content: item.content || "",
      category: item.category || "",
      coverImage: item.coverImage || "",
      eventDate: item.eventDate ? item.eventDate.slice(0, 16) : "",
      location: item.location || "",
    });
    setShowForm(item.type);
  };

  const saveContent = async () => {
    if (!form.title.trim() || !form.content.trim()) return toast.warn("Titre et contenu obligatoires");
    try {
      if (editing) {
        await apiPut(`/contents/${editing.id}`, form);
        toast.success("Contenu mis à jour");
      } else {
        await apiPost("/contents", { ...form, type: showForm, eventDate: form.eventDate || null });
        toast.success(isAdmin ? "Publié !" : "Soumis pour validation");
      }
      setShowForm(null);
      setEditing(null);
      refreshAll();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erreur");
    }
  };

  const approve = async (id: number) => {
    await apiPost(`/contents/${id}/approve`, {});
    toast.success("Approuvé et publié");
    refreshAll();
  };
  const reject = async (id: number) => {
    const reason = prompt("Motif du rejet ?") || "Refusé";
    await apiPost(`/contents/${id}/reject`, { reason });
    toast.info("Rejeté");
    refreshAll();
  };
  const remove = async (id: number) => {
    if (!window.confirm("Supprimer ce contenu ?")) return;
    await apiDel(`/contents/${id}`);
    toast.info("Supprimé");
    refreshAll();
  };

  const createPublisher = async () => {
    const { name, email, password, role, facultyId } = userForm;
    if (!name.trim() || !email.trim() || !password.trim())
      return toast.warn("Nom, email et mot de passe requis");
    if (password.length < 6) return toast.warn("Le mot de passe doit faire au moins 6 caractères");
    if (role === "faculty_publisher" && !facultyId) return toast.warn("Veuillez sélectionner une faculté");
    try {
      await apiPost("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        facultyId: facultyId ? Number(facultyId) : null,
      });
      toast.success("Compte créé avec succès");
      setShowUserForm(false);
      setUserForm({ name: "", email: "", password: "", role: "faculty_publisher", facultyId: "" });
      refreshAll();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erreur");
    }
  };

  const statBadge = (label: string, value: number | string, color = Colors.primaryColor, IconC?: any) => (
    <div
      style={{
        flex: 1,
        minWidth: 180,
        padding: 22,
        background: "white",
        borderRadius: 10,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {IconC && <IconC size={28} color={color} />}
        <div>
          <div style={{ color: "#666", fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: Colors.darkColor }}>{value ?? 0}</div>
        </div>
      </div>
    </div>
  );

  const TabBtn: React.FC<{ id: Tab; label: string; badge?: number }> = ({ id, label, badge }) => (
    <button
      data-testid={`dashboard-tab-${id}`}
      onClick={() => setTab(id)}
      style={{
        padding: "12px 18px",
        border: "none",
        background: tab === id ? Colors.primaryColor : "transparent",
        color: tab === id ? "white" : "#333",
        borderRadius: 6,
        cursor: "pointer",
        fontWeight: tab === id ? 600 : 500,
        fontSize: 14,
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {label}
      {badge !== undefined && badge > 0 && (
        <span
          style={{
            background: tab === id ? "white" : Colors.redColor,
            color: tab === id ? Colors.primaryColor : "white",
            padding: "2px 8px",
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const map: any = {
      published: { bg: "#d4edda", c: "#155724", t: "Publié" },
      pending: { bg: "#fff3cd", c: "#856404", t: "En attente" },
      rejected: { bg: "#f8d7da", c: "#721c24", t: "Rejeté" },
      draft: { bg: "#e2e3e5", c: "#383d41", t: "Brouillon" },
    };
    const x = map[status] || map.draft;
    return <span style={{ background: x.bg, color: x.c, padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{x.t}</span>;
  };

  const listView = (items: any[], withActions = true) => (
    <div style={{ display: "grid", gap: 12 }}>
      {items.length === 0 && <p style={{ color: "#888" }}>Aucun élément.</p>}
      {items.map((it) => (
        <div
          key={it.id}
          data-testid={`content-row-${it.id}`}
          style={{ background: "white", padding: 16, borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "center" }}
        >
          {it.coverImage && <img src={it.coverImage} alt="" style={{ width: 86, height: 64, objectFit: "cover", borderRadius: 6 }} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, background: Colors.darkColor, color: "white", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>{it.type}</span>
              <StatusBadge status={it.status} />
              {it.category && <span style={{ fontSize: 12, color: "#666" }}>{it.category}</span>}
            </div>
            <h4 style={{ margin: "6px 0 4px", fontSize: 16, color: Colors.darkColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</h4>
            <div style={{ fontSize: 12, color: "#888" }}>
              Par {it.author?.name} · {new Date(it.createdAt).toLocaleDateString()}
            </div>
            {it.rejectionReason && <div style={{ fontSize: 12, color: Colors.redColor, marginTop: 4 }}>Motif: {it.rejectionReason}</div>}
          </div>
          {withActions && (
            <div style={{ display: "flex", gap: 6 }}>
              {isAdmin && it.status === "pending" && (
                <>
                  <button data-testid={`approve-${it.id}`} onClick={() => approve(it.id)} title="Approuver" style={{ background: "#28a745", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>
                    <CheckI />
                  </button>
                  <button data-testid={`reject-${it.id}`} onClick={() => reject(it.id)} title="Rejeter" style={{ background: "#dc3545", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>
                    <XI />
                  </button>
                </>
              )}
              <button data-testid={`edit-${it.id}`} onClick={() => openEdit(it)} style={{ background: "#f0f0f0", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>
                <EditI />
              </button>
              <button data-testid={`delete-${it.id}`} onClick={() => remove(it.id)} style={{ background: "#fde2e2", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer", color: Colors.redColor }}>
                <TrashI />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div data-testid="dashboard-page" style={{ background: "#f5f6fa", minHeight: "calc(100vh - 100px)", padding: "30px 20px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div>
            <h1 style={{ color: Colors.primaryColor, fontSize: 28, fontWeight: 700, margin: 0 }}>Tableau de bord</h1>
            <div style={{ color: "#666", marginTop: 4, fontSize: 14 }}>
              {user.name} · <b>{isAdmin ? "Super Administrateur" : `Publieur · ${user.faculty?.name || "Faculté"}`}</b>
            </div>
          </div>
          <button data-testid="dashboard-logout" onClick={handleLogout} style={{ background: Colors.redColor, color: "white", border: "none", padding: "10px 18px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <LogoutI /> Déconnexion
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          {statBadge("Total contenus", stats.total, Colors.primaryColor)}
          {statBadge("En attente", stats.pending, "#f1a606", ClockI)}
          {statBadge("Publiés", stats.published, "#28a745", CheckI)}
          {statBadge("Rejetés", stats.rejected, Colors.redColor, XI)}
          {isAdmin && statBadge("Abonnés newsletter", stats.newsletters, "#6f42c1", MailI)}
          {isAdmin && statBadge("Messages non-lus", stats.messages, "#fd7e14", UsersI)}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 22, overflowX: "auto", paddingBottom: 8 }}>
          <TabBtn id="overview" label="Vue d'ensemble" />
          <TabBtn id="articles" label="Articles" />
          <TabBtn id="events" label="Événements" />
          <TabBtn id="activities" label="Activités" />
          {isAdmin && <TabBtn id="pending" label="À valider" badge={pending.length} />}
          {isAdmin && <TabBtn id="newsletter" label="Newsletter" />}
          {isAdmin && <TabBtn id="messages" label="Messages" />}
          {isAdmin && <TabBtn id="users" label="Utilisateurs" />}
        </div>

        {/* Tab content */}
        <div style={{ background: "#fff0", borderRadius: 10 }}>
          {tab === "overview" && (
            <div>
              <h3 style={{ marginBottom: 14 }}>Derniers contenus</h3>
              {listView(contents.slice(0, 6))}
            </div>
          )}
          {(tab === "articles" || tab === "events" || tab === "activities") && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ margin: 0, textTransform: "capitalize" }}>{tab}</h3>
                <button
                  data-testid={`new-${tab.slice(0, -1)}-button`}
                  onClick={() => openCreate(tab.slice(0, -1) as any)}
                  style={{ background: Colors.primaryColor, color: "white", border: "none", padding: "10px 16px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <PlusI /> Nouveau
                </button>
              </div>
              {listView(contents.filter((c) => c.type === tab.slice(0, -1)))}
            </div>
          )}
          {tab === "pending" && isAdmin && (
            <div>
              <h3>Contenus en attente de validation</h3>
              {listView(pending)}
            </div>
          )}
          {tab === "newsletter" && isAdmin && (
            <div>
              <h3>Abonnés newsletter ({newsletters.length})</h3>
              <div style={{ background: "white", borderRadius: 8, padding: 16 }}>
                {newsletters.length === 0 && <p style={{ color: "#888" }}>Aucun abonné.</p>}
                {newsletters.map((n) => (
                  <div key={n.id} data-testid={`newsletter-${n.id}`} style={{ padding: "8px 0", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
                    <span>{n.email}</span>
                    <span style={{ fontSize: 12, color: "#888" }}>{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "messages" && isAdmin && (
            <div>
              <h3>Messages de contact</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {messages.length === 0 && <p style={{ color: "#888" }}>Aucun message.</p>}
                {messages.map((m) => (
                  <div key={m.id} data-testid={`message-${m.id}`} style={{ background: "white", padding: 16, borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong>{m.subject}</strong>
                      <span style={{ fontSize: 12, color: "#888" }}>{new Date(m.createdAt).toLocaleString()}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                      <b>{m.name}</b> &lt;{m.email}&gt;
                    </div>
                    <p style={{ marginTop: 10, color: "#333", whiteSpace: "pre-wrap" }}>{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "users" && isAdmin && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ margin: 0 }}>Utilisateurs</h3>
                <button
                  data-testid="create-user-button"
                  onClick={() => setShowUserForm(true)}
                  style={{ background: Colors.primaryColor, color: "white", border: "none", padding: "10px 16px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <UserPlusI /> Créer un publieur
                </button>
              </div>
              <div style={{ background: "white", borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#f7f8fa" }}>
                    <tr>
                      <th style={{ padding: 12, textAlign: "left" }}>Nom</th>
                      <th style={{ padding: 12, textAlign: "left" }}>Email</th>
                      <th style={{ padding: 12, textAlign: "left" }}>Rôle</th>
                      <th style={{ padding: 12, textAlign: "left" }}>Faculté</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} data-testid={`user-${u.id}`} style={{ borderTop: "1px solid #eee" }}>
                        <td style={{ padding: 12 }}>{u.name}</td>
                        <td style={{ padding: 12 }}>{u.email}</td>
                        <td style={{ padding: 12 }}>
                          <StatusBadge status={u.role === "super_admin" ? "published" : "pending"} />
                          <span style={{ marginLeft: 6 }}>{u.role === "super_admin" ? "Super Admin" : "Publieur"}</span>
                        </td>
                        <td style={{ padding: 12 }}>{u.faculty?.name || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form modal */}
      {showForm && (
        <div onClick={() => setShowForm(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 10, maxWidth: 720, width: "100%", maxHeight: "90vh", overflow: "auto", padding: 28 }}>
            <h3 style={{ marginTop: 0, color: Colors.primaryColor, textTransform: "capitalize" }}>
              {editing ? "Modifier" : "Nouveau"} {showForm}
            </h3>
            <div style={{ display: "grid", gap: 12 }}>
              <input data-testid="form-title" placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <input placeholder="Catégorie (ex: Académique)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <ImageUpload
                value={form.coverImage}
                onChange={(url) => setForm({ ...form, coverImage: url })}
                folder={showForm === "event" ? "ulpgl/events" : showForm === "activity" ? "ulpgl/activities" : "ulpgl/articles"}
                label="Image de couverture"
                testId="cover-image"
              />
              {showForm === "event" && (
                <>
                  <input type="datetime-local" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                  <input placeholder="Lieu" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                </>
              )}
              <textarea placeholder="Résumé court" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <div data-testid="form-content">
                <div style={{ fontSize: 13, color: "#444", marginBottom: 6, fontWeight: 500 }}>Contenu</div>
                <RichEditor
                  value={form.content}
                  onChange={(html) => setForm({ ...form, content: html })}
                  folder={showForm === "event" ? "ulpgl/events" : showForm === "activity" ? "ulpgl/activities" : "ulpgl/articles"}
                  placeholder="Rédigez votre contenu ici (titres, listes, images, liens...)"
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setShowForm(null)} style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>
                Annuler
              </button>
              <button data-testid="form-save-button" onClick={saveContent} style={{ padding: "10px 22px", background: Colors.primaryColor, color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
                {editing ? "Mettre à jour" : isAdmin ? "Publier" : "Soumettre pour validation"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create publisher modal */}
      {showUserForm && (
        <div onClick={() => setShowUserForm(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} data-testid="create-user-modal" style={{ background: "white", borderRadius: 10, maxWidth: 520, width: "100%", padding: 28 }}>
            <h3 style={{ marginTop: 0, color: Colors.primaryColor }}>Créer un compte utilisateur</h3>
            <p style={{ color: "#666", fontSize: 14, marginBottom: 18 }}>Le compte sera immédiatement actif et pourra se connecter.</p>
            <div style={{ display: "grid", gap: 12 }}>
              <input
                data-testid="user-name-input"
                placeholder="Nom complet"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6 }}
              />
              <input
                data-testid="user-email-input"
                type="email"
                placeholder="Adresse email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6 }}
              />
              <input
                data-testid="user-password-input"
                type="password"
                placeholder="Mot de passe (min. 6 caractères)"
                value={userForm.password}
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6 }}
              />
              <select
                data-testid="user-role-select"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6, background: "white" }}
              >
                <option value="faculty_publisher">Publieur faculté</option>
                <option value="super_admin">Super administrateur</option>
              </select>
              {userForm.role === "faculty_publisher" && (
                <select
                  data-testid="user-faculty-select"
                  value={userForm.facultyId}
                  onChange={(e) => setUserForm({ ...userForm, facultyId: e.target.value })}
                  style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6, background: "white" }}
                >
                  <option value="">— Sélectionner une faculté —</option>
                  {faculties.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setShowUserForm(false)} style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>
                Annuler
              </button>
              <button data-testid="user-create-submit" onClick={createPublisher} style={{ padding: "10px 22px", background: Colors.primaryColor, color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
                Créer le compte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
