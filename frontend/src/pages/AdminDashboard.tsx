import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiDel, apiGet, apiPost, apiPut } from "../utils/api";
import { Colors } from "../utils/utils.colors";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiUsers,
  FiClock as FiClockI,
  FiUserPlus,
} from "react-icons/fi";
import { ImageUpload } from "../components/subcomponents/ImageUpload";
import { RichEditor } from "../components/subcomponents/RichEditor";
import { ADMIN_BASE } from "../components/AdminLayout";

const I = (C: any) => C as any;
const PlusI = I(FiPlus);
const CheckI = I(FiCheckCircle);
const XI = I(FiXCircle);
const EditI = I(FiEdit2);
const TrashI = I(FiTrash2);
const MailI = I(FiMail);
const UsersI = I(FiUsers);
const ClockI = I(FiClockI);
const UserPlusI = I(FiUserPlus);

type ContentType = "article" | "event" | "activity";

const STATUS_BADGE: any = {
  published: { bg: "#d4edda", c: "#155724", t: "Publié" },
  pending: { bg: "#fff3cd", c: "#856404", t: "En attente" },
  rejected: { bg: "#f8d7da", c: "#721c24", t: "Rejeté" },
  draft: { bg: "#e2e3e5", c: "#383d41", t: "Brouillon" },
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const x = STATUS_BADGE[status] || STATUS_BADGE.draft;
  return (
    <span style={{ background: x.bg, color: x.c, padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
      {x.t}
    </span>
  );
};

const StatCard: React.FC<{ label: string; value: any; color?: string; Icon?: any }> = ({ label, value, color = Colors.primaryColor, Icon }) => (
  <div style={{ flex: 1, minWidth: 180, padding: 22, background: "white", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${color}` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {Icon && <Icon size={28} color={color} />}
      <div>
        <div style={{ color: "#666", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: Colors.darkColor }}>{value ?? 0}</div>
      </div>
    </div>
  </div>
);

const EMPTY_CONTENT = { title: "", excerpt: "", content: "", category: "", coverImage: "", eventDate: "", location: "" };
const EMPTY_CENTER = {
  title: "",
  description: "",
  profile: "",
  coverImage: "",
  domaineInterventions: "",
  etudesRealisees: "",
  partenaires: "",
  contacts: "",
  directionName: "",
  directionRole: "",
  directionEmail: "",
  directionPhone: "",
};
const EMPTY_SCHEDULE = {
  type: "cours" as "cours" | "examen",
  title: "",
  facultyId: "",
  filiereId: "",
  promotion: "L1",
  academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
  semester: "S1",
  startDate: "",
  endDate: "",
  location: "",
  fileUrl: "",
  description: "",
};
const EMPTY_USER = { name: "", email: "", password: "", role: "faculty_publisher", facultyId: "" };

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // tab from URL
  const slug = location.pathname.replace(ADMIN_BASE, "").replace(/^\//, "") || "overview";

  const [stats, setStats] = useState<any>({});
  const [contents, setContents] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);

  // Modals
  const [contentModal, setContentModal] = useState<null | ContentType>(null);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [contentForm, setContentForm] = useState<any>(EMPTY_CONTENT);

  const [scheduleModal, setScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [scheduleForm, setScheduleForm] = useState<any>(EMPTY_SCHEDULE);

  const [userModal, setUserModal] = useState(false);
  const [userForm, setUserForm] = useState<any>(EMPTY_USER);

  const [centers, setCenters] = useState<any[]>([]);
  const [centerModal, setCenterModal] = useState(false);
  const [editingCenter, setEditingCenter] = useState<any>(null);
  const [centerForm, setCenterForm] = useState<any>(EMPTY_CENTER);

  const refreshAll = async () => {
    if (!user) return;
    try {
      const [s, all, fac, sch, cen] = await Promise.all([
        apiGet("/dashboard/stats"),
        apiGet("/contents/admin"),
        apiGet("/faculties"),
        apiGet("/schedules/admin"),
        apiGet("/centers/admin"),
      ]);
      setStats(s);
      setContents(all.items);
      setFaculties(fac.items);
      setSchedules(sch.items);
      setCenters(cen.items);
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
  }, [user, slug]);

  // ---------- Content ----------
  const openContentCreate = (type: ContentType) => {
    setEditingContent(null);
    setContentForm(EMPTY_CONTENT);
    setContentModal(type);
  };
  const openContentEdit = (it: any) => {
    setEditingContent(it);
    setContentForm({
      title: it.title,
      excerpt: it.excerpt || "",
      content: it.content || "",
      category: it.category || "",
      coverImage: it.coverImage || "",
      eventDate: it.eventDate ? it.eventDate.slice(0, 16) : "",
      location: it.location || "",
    });
    setContentModal(it.type);
  };
  const saveContent = async () => {
    if (!contentForm.title.trim() || !contentForm.content.trim()) return toast.warn("Titre et contenu obligatoires");
    try {
      if (editingContent) {
        await apiPut(`/contents/${editingContent.id}`, contentForm);
        toast.success("Mis à jour");
      } else {
        await apiPost("/contents", { ...contentForm, type: contentModal, eventDate: contentForm.eventDate || null });
        toast.success(isAdmin ? "Publié" : "Soumis pour validation");
      }
      setContentModal(null);
      setEditingContent(null);
      refreshAll();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erreur");
    }
  };
  const approveContent = async (id: number) => { await apiPost(`/contents/${id}/approve`, {}); toast.success("Approuvé"); refreshAll(); };
  const rejectContent = async (id: number) => {
    const reason = prompt("Motif du rejet ?") || "Refusé";
    await apiPost(`/contents/${id}/reject`, { reason });
    toast.info("Rejeté");
    refreshAll();
  };
  const removeContent = async (id: number) => {
    if (!window.confirm("Supprimer ?")) return;
    await apiDel(`/contents/${id}`);
    refreshAll();
  };

  // ---------- Schedule ----------
  const openScheduleCreate = () => {
    setEditingSchedule(null);
    setScheduleForm({ ...EMPTY_SCHEDULE, facultyId: user?.facultyId || "" });
    setScheduleModal(true);
  };
  const openScheduleEdit = (it: any) => {
    setEditingSchedule(it);
    setScheduleForm({
      type: it.type, title: it.title, facultyId: it.facultyId, filiereId: it.filiereId || "",
      promotion: it.promotion, academicYear: it.academicYear || "", semester: it.semester || "",
      startDate: it.startDate ? it.startDate.slice(0, 16) : "", endDate: it.endDate ? it.endDate.slice(0, 16) : "",
      location: it.location || "", fileUrl: it.fileUrl || "", description: it.description || "",
    });
    setScheduleModal(true);
  };
  const saveSchedule = async () => {
    if (!scheduleForm.title.trim() || !scheduleForm.promotion) return toast.warn("Titre et promotion requis");
    if (isAdmin && !scheduleForm.facultyId) return toast.warn("Faculté requise");
    try {
      const payload = {
        ...scheduleForm,
        facultyId: scheduleForm.facultyId ? Number(scheduleForm.facultyId) : undefined,
        filiereId: scheduleForm.filiereId ? Number(scheduleForm.filiereId) : null,
        startDate: scheduleForm.startDate || null,
        endDate: scheduleForm.endDate || null,
      };
      if (editingSchedule) {
        await apiPut(`/schedules/${editingSchedule.id}`, payload);
        toast.success("Horaire mis à jour");
      } else {
        await apiPost("/schedules", payload);
        toast.success(isAdmin ? "Publié" : "Soumis pour validation");
      }
      setScheduleModal(false);
      refreshAll();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erreur");
    }
  };
  const approveSchedule = async (id: number) => { await apiPost(`/schedules/${id}/approve`, {}); refreshAll(); };
  const rejectSchedule = async (id: number) => {
    const reason = prompt("Motif ?") || "Refusé";
    await apiPost(`/schedules/${id}/reject`, { reason }); refreshAll();
  };
  const removeSchedule = async (id: number) => {
    if (!window.confirm("Supprimer ?")) return;
    await apiDel(`/schedules/${id}`); refreshAll();
  };

  // ---------- Center ----------
  const splitLines = (s: string) => (s || "").split("\n").map((x) => x.trim()).filter(Boolean);
  const joinLines = (arr?: any[]) => (arr || []).join("\n");

  const openCenterCreate = () => {
    setEditingCenter(null);
    setCenterForm(EMPTY_CENTER);
    setCenterModal(true);
  };
  const openCenterEdit = (it: any) => {
    setEditingCenter(it);
    setCenterForm({
      title: it.title,
      description: it.description || "",
      profile: it.profile || "",
      coverImage: it.coverImage || "",
      domaineInterventions: joinLines(it.domaineInterventions),
      etudesRealisees: joinLines(it.etudesRealisees),
      partenaires: joinLines(it.partenaires),
      contacts: joinLines(it.contacts),
      directionName: it.direction?.name || "",
      directionRole: it.direction?.role || "",
      directionEmail: (it.direction?.email || []).join(", "),
      directionPhone: (it.direction?.phone || []).join(", "),
    });
    setCenterModal(true);
  };
  const saveCenter = async () => {
    if (!centerForm.title.trim() || !centerForm.description.trim())
      return toast.warn("Titre et description requis");
    const direction = centerForm.directionName.trim()
      ? {
          name: centerForm.directionName.trim(),
          role: centerForm.directionRole.trim() || "Directeur",
          slug: centerForm.directionName.toLowerCase().replace(/\s+/g, "-"),
          email: centerForm.directionEmail.split(",").map((s: string) => s.trim()).filter(Boolean),
          phone: centerForm.directionPhone.split(",").map((s: string) => s.trim()).filter(Boolean),
        }
      : null;
    const payload = {
      title: centerForm.title.trim(),
      description: centerForm.description.trim(),
      profile: centerForm.profile || "",
      coverImage: centerForm.coverImage || "",
      direction,
      domaineInterventions: splitLines(centerForm.domaineInterventions),
      etudesRealisees: splitLines(centerForm.etudesRealisees),
      partenaires: splitLines(centerForm.partenaires),
      contacts: splitLines(centerForm.contacts),
    };
    try {
      if (editingCenter) {
        await apiPut(`/centers/${editingCenter.id}`, payload);
        toast.success("Centre mis à jour");
      } else {
        await apiPost("/centers", payload);
        toast.success(isAdmin ? "Publié" : "Soumis pour validation");
      }
      setCenterModal(false);
      refreshAll();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erreur");
    }
  };
  const approveCenter = async (id: number) => { await apiPost(`/centers/${id}/approve`, {}); refreshAll(); };
  const rejectCenter = async (id: number) => {
    const reason = prompt("Motif ?") || "Refusé";
    await apiPost(`/centers/${id}/reject`, { reason }); refreshAll();
  };
  const removeCenter = async (id: number) => {
    if (!window.confirm("Supprimer ?")) return;
    await apiDel(`/centers/${id}`); refreshAll();
  };

  // ---------- User creation ----------
  const createPublisher = async () => {
    const { name, email, password, role, facultyId } = userForm;
    if (!name.trim() || !email.trim() || !password.trim()) return toast.warn("Champs requis");
    if (password.length < 6) return toast.warn("Mot de passe trop court");
    if (role === "faculty_publisher" && !facultyId) return toast.warn("Sélectionnez une faculté");
    try {
      await apiPost("/auth/register", {
        name: name.trim(), email: email.trim(), password, role,
        facultyId: facultyId ? Number(facultyId) : null,
      });
      toast.success("Compte créé");
      setUserModal(false);
      setUserForm(EMPTY_USER);
      refreshAll();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erreur");
    }
  };

  // ---------- Renderers ----------
  const contentRow = (it: any, scope: "content" | "schedule" = "content") => (
    <div key={`${scope}-${it.id}`} data-testid={`${scope}-row-${it.id}`} style={{ background: "white", padding: 16, borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "center", marginBottom: 10 }}>
      {scope === "content" && it.coverImage && <img src={it.coverImage} alt="" style={{ width: 86, height: 64, objectFit: "cover", borderRadius: 6 }} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, background: Colors.darkColor, color: "white", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>{it.type}</span>
          <StatusBadge status={it.status} />
          {scope === "schedule" && it.promotion && <span style={{ fontSize: 12, color: "#666", fontWeight: 600 }}>{it.promotion}</span>}
          {it.category && <span style={{ fontSize: 12, color: "#666" }}>{it.category}</span>}
          {it.faculty?.name && <span style={{ fontSize: 12, color: "#888" }}>· {it.faculty.name}</span>}
        </div>
        <h4 style={{ margin: "6px 0 4px", fontSize: 15, color: Colors.darkColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</h4>
        <div style={{ fontSize: 11, color: "#888" }}>
          Par {it.author?.name} · {new Date(it.createdAt).toLocaleDateString()}
          {it.academicYear && ` · ${it.academicYear}`}
        </div>
        {it.rejectionReason && <div style={{ fontSize: 11, color: Colors.redColor, marginTop: 4 }}>Motif: {it.rejectionReason}</div>}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {isAdmin && it.status === "pending" && (
          <>
            <button data-testid={`${scope}-approve-${it.id}`} onClick={() => (scope === "content" ? approveContent(it.id) : approveSchedule(it.id))} title="Approuver" style={{ background: "#28a745", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>
              <CheckI />
            </button>
            <button data-testid={`${scope}-reject-${it.id}`} onClick={() => (scope === "content" ? rejectContent(it.id) : rejectSchedule(it.id))} title="Rejeter" style={{ background: "#dc3545", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>
              <XI />
            </button>
          </>
        )}
        <button data-testid={`${scope}-edit-${it.id}`} onClick={() => (scope === "content" ? openContentEdit(it) : openScheduleEdit(it))} style={{ background: "#f0f0f0", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}>
          <EditI />
        </button>
        <button data-testid={`${scope}-delete-${it.id}`} onClick={() => (scope === "content" ? removeContent(it.id) : removeSchedule(it.id))} style={{ background: "#fde2e2", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer", color: Colors.redColor }}>
          <TrashI />
        </button>
      </div>
    </div>
  );

  const renderTab = () => {
    if (slug === "overview" || slug === "") {
      return (
        <>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
            <StatCard label="Contenus" value={stats.total} />
            <StatCard label="En attente" value={stats.pending} color="#f1a606" Icon={ClockI} />
            <StatCard label="Publiés" value={stats.published} color="#28a745" Icon={CheckI} />
            <StatCard label="Rejetés" value={stats.rejected} color={Colors.redColor} Icon={XI} />
            <StatCard label="Horaires" value={stats.schedulesTotal} color="#6f42c1" Icon={ClockI} />
            {isAdmin && <StatCard label="Newsletter" value={stats.newsletters} color="#0dcaf0" Icon={MailI} />}
            {isAdmin && <StatCard label="Messages" value={stats.messages} color="#fd7e14" Icon={UsersI} />}
          </div>
          <h3>Derniers contenus</h3>
          {contents.slice(0, 6).map((c) => contentRow(c))}
        </>
      );
    }
    if (["articles", "events", "activities"].includes(slug)) {
      const type = slug.slice(0, -1) as ContentType;
      const items = contents.filter((c) => c.type === type);
      return (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0, textTransform: "capitalize" }}>{slug}</h3>
            <button data-testid={`new-${type}-button`} onClick={() => openContentCreate(type)} style={{ background: Colors.primaryColor, color: "white", border: "none", padding: "10px 16px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <PlusI /> Nouveau
            </button>
          </div>
          {items.length === 0 && <p style={{ color: "#888" }}>Aucun élément.</p>}
          {items.map((c) => contentRow(c))}
        </>
      );
    }
    if (slug === "schedules") {
      return (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0 }}>Horaires (cours & examens)</h3>
            <button data-testid="new-schedule-button" onClick={openScheduleCreate} style={{ background: Colors.primaryColor, color: "white", border: "none", padding: "10px 16px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <PlusI /> Nouvel horaire
            </button>
          </div>
          {schedules.length === 0 && <p style={{ color: "#888" }}>Aucun horaire publié pour le moment.</p>}
          {schedules.map((s) => contentRow(s, "schedule"))}
        </>
      );
    }
    if (slug === "centers") {
      return (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0 }}>Centres de recherche</h3>
            <button data-testid="new-center-button" onClick={openCenterCreate} style={{ background: Colors.primaryColor, color: "white", border: "none", padding: "10px 16px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <PlusI /> Nouveau centre
            </button>
          </div>
          {centers.length === 0 && <p style={{ color: "#888" }}>Aucun centre.</p>}
          {centers.map((c) => (
            <div key={c.id} data-testid={`center-row-${c.id}`} style={{ background: "white", padding: 16, borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", display: "flex", gap: 16, alignItems: "center", marginBottom: 10 }}>
              {c.coverImage && <img src={c.coverImage} alt="" style={{ width: 86, height: 64, objectFit: "cover", borderRadius: 6 }} />}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, background: Colors.darkColor, color: "white", padding: "2px 8px", borderRadius: 4 }}>CENTRE</span>
                  <StatusBadge status={c.status} />
                </div>
                <h4 style={{ margin: "6px 0 4px", fontSize: 15, color: Colors.darkColor }}>{c.title}</h4>
                <div style={{ fontSize: 12, color: "#666" }}>{(c.description || "").slice(0, 100)}...</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {isAdmin && c.status === "pending" && (
                  <>
                    <button onClick={() => approveCenter(c.id)} style={{ background: "#28a745", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}><CheckI /></button>
                    <button onClick={() => rejectCenter(c.id)} style={{ background: "#dc3545", color: "white", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}><XI /></button>
                  </>
                )}
                <button data-testid={`center-edit-${c.id}`} onClick={() => openCenterEdit(c)} style={{ background: "#f0f0f0", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer" }}><EditI /></button>
                <button data-testid={`center-delete-${c.id}`} onClick={() => removeCenter(c.id)} style={{ background: "#fde2e2", border: "none", padding: "8px 10px", borderRadius: 6, cursor: "pointer", color: Colors.redColor }}><TrashI /></button>
              </div>
            </div>
          ))}
        </>
      );
    }
    if (slug === "pending" && isAdmin) {
      return (
        <>
          <h3>Contenus en attente de validation</h3>
          {pending.length === 0 && <p style={{ color: "#888" }}>Tout est à jour, rien à valider 🎉</p>}
          {pending.map((c) => contentRow(c))}
        </>
      );
    }
    if (slug === "newsletter" && isAdmin) {
      return (
        <>
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
        </>
      );
    }
    if (slug === "messages" && isAdmin) {
      return (
        <>
          <h3>Messages de contact</h3>
          {messages.length === 0 && <p style={{ color: "#888" }}>Aucun message.</p>}
          <div style={{ display: "grid", gap: 12 }}>
            {messages.map((m) => (
              <div key={m.id} data-testid={`message-${m.id}`} style={{ background: "white", padding: 16, borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{m.subject}</strong>
                  <span style={{ fontSize: 12, color: "#888" }}>{new Date(m.createdAt).toLocaleString()}</span>
                </div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}><b>{m.name}</b> &lt;{m.email}&gt;</div>
                <p style={{ marginTop: 10, color: "#333", whiteSpace: "pre-wrap" }}>{m.message}</p>
              </div>
            ))}
          </div>
        </>
      );
    }
    if (slug === "users" && isAdmin) {
      return (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ margin: 0 }}>Utilisateurs</h3>
            <button data-testid="create-user-button" onClick={() => setUserModal(true)} style={{ background: Colors.primaryColor, color: "white", border: "none", padding: "10px 16px", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
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
                    <td style={{ padding: 12 }}>{u.role === "super_admin" ? "Super Admin" : "Publieur"}</td>
                    <td style={{ padding: 12 }}>{u.faculty?.name || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    }
    return <div>Page introuvable</div>;
  };

  return (
    <div>
      {renderTab()}

      {/* Content modal */}
      {contentModal && (
        <div onClick={() => setContentModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 10, maxWidth: 760, width: "100%", maxHeight: "92vh", overflow: "auto", padding: 28 }}>
            <h3 style={{ marginTop: 0, color: Colors.primaryColor, textTransform: "capitalize" }}>
              {editingContent ? "Modifier" : "Nouveau"} {contentModal}
            </h3>
            <div style={{ display: "grid", gap: 12 }}>
              <input data-testid="form-title" placeholder="Titre" value={contentForm.title} onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <input placeholder="Catégorie" value={contentForm.category} onChange={(e) => setContentForm({ ...contentForm, category: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <ImageUpload
                value={contentForm.coverImage}
                onChange={(url) => setContentForm({ ...contentForm, coverImage: url })}
                folder={contentModal === "event" ? "ulpgl/events" : contentModal === "activity" ? "ulpgl/activities" : "ulpgl/articles"}
                label="Image de couverture"
                testId="cover-image"
              />
              {contentModal === "event" && (
                <>
                  <input type="datetime-local" value={contentForm.eventDate} onChange={(e) => setContentForm({ ...contentForm, eventDate: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                  <input placeholder="Lieu" value={contentForm.location} onChange={(e) => setContentForm({ ...contentForm, location: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                </>
              )}
              <textarea placeholder="Résumé court" rows={2} value={contentForm.excerpt} onChange={(e) => setContentForm({ ...contentForm, excerpt: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <div data-testid="form-content">
                <div style={{ fontSize: 13, color: "#444", marginBottom: 6, fontWeight: 500 }}>Contenu</div>
                <RichEditor value={contentForm.content} onChange={(html) => setContentForm({ ...contentForm, content: html })}
                  folder={contentModal === "event" ? "ulpgl/events" : contentModal === "activity" ? "ulpgl/activities" : "ulpgl/articles"} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setContentModal(null)} style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>Annuler</button>
              <button data-testid="form-save-button" onClick={saveContent} style={{ padding: "10px 22px", background: Colors.primaryColor, color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
                {editingContent ? "Mettre à jour" : isAdmin ? "Publier" : "Soumettre"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule modal */}
      {scheduleModal && (
        <div onClick={() => setScheduleModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} data-testid="schedule-modal" style={{ background: "white", borderRadius: 10, maxWidth: 720, width: "100%", maxHeight: "92vh", overflow: "auto", padding: 28 }}>
            <h3 style={{ marginTop: 0, color: Colors.primaryColor }}>
              {editingSchedule ? "Modifier" : "Nouvel"} horaire
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Type</label>
                <select data-testid="schedule-type" value={scheduleForm.type} onChange={(e) => setScheduleForm({ ...scheduleForm, type: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
                  <option value="cours">Horaire des cours</option>
                  <option value="examen">Horaire des examens</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Promotion</label>
                <select data-testid="schedule-promotion" value={scheduleForm.promotion} onChange={(e) => setScheduleForm({ ...scheduleForm, promotion: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
                  {["L1", "L2", "L3", "M1", "M2"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <input data-testid="schedule-title" placeholder="Titre (ex: Horaire S1 — Génie Informatique)" value={scheduleForm.title} onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              </div>
              {isAdmin && (
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Faculté</label>
                  <select data-testid="schedule-faculty" value={scheduleForm.facultyId} onChange={(e) => setScheduleForm({ ...scheduleForm, facultyId: e.target.value, filiereId: "" })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
                    <option value="">— Sélectionner —</option>
                    {faculties.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Filière (optionnel)</label>
                <select value={scheduleForm.filiereId} onChange={(e) => setScheduleForm({ ...scheduleForm, filiereId: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
                  <option value="">— Toutes les filières —</option>
                  {(faculties.find((f) => String(f.id) === String(scheduleForm.facultyId))?.filieres || []).map((fi: any) => (
                    <option key={fi.id} value={fi.id}>{fi.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Année académique</label>
                <input value={scheduleForm.academicYear} onChange={(e) => setScheduleForm({ ...scheduleForm, academicYear: e.target.value })} placeholder="2025-2026" style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Semestre</label>
                <select value={scheduleForm.semester} onChange={(e) => setScheduleForm({ ...scheduleForm, semester: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="">—</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Début</label>
                <input type="datetime-local" value={scheduleForm.startDate} onChange={(e) => setScheduleForm({ ...scheduleForm, startDate: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>Fin</label>
                <input type="datetime-local" value={scheduleForm.endDate} onChange={(e) => setScheduleForm({ ...scheduleForm, endDate: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <input placeholder="Lieu / salle" value={scheduleForm.location} onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <ImageUpload value={scheduleForm.fileUrl} onChange={(url) => setScheduleForm({ ...scheduleForm, fileUrl: url })} folder="ulpgl/uploads" label="Document / image (PDF scanné ou image)" testId="schedule-file" />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <textarea placeholder="Description / commentaires" rows={3} value={scheduleForm.description} onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setScheduleModal(false)} style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>Annuler</button>
              <button data-testid="schedule-save-button" onClick={saveSchedule} style={{ padding: "10px 22px", background: Colors.primaryColor, color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
                {editingSchedule ? "Mettre à jour" : isAdmin ? "Publier" : "Soumettre"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Center modal */}
      {centerModal && (
        <div onClick={() => setCenterModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} data-testid="center-modal" style={{ background: "white", borderRadius: 10, maxWidth: 760, width: "100%", maxHeight: "92vh", overflow: "auto", padding: 28 }}>
            <h3 style={{ marginTop: 0, color: Colors.primaryColor }}>{editingCenter ? "Modifier" : "Nouveau"} centre de recherche</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <input data-testid="center-title" placeholder="Nom du centre (ex: CREDDA)" value={centerForm.title} onChange={(e) => setCenterForm({ ...centerForm, title: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <textarea data-testid="center-description" placeholder="Description courte" rows={3} value={centerForm.description} onChange={(e) => setCenterForm({ ...centerForm, description: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <ImageUpload value={centerForm.coverImage} onChange={(url) => setCenterForm({ ...centerForm, coverImage: url })} folder="ulpgl/uploads" label="Image de couverture (optionnelle)" testId="center-cover" />

              <div style={{ borderTop: "1px solid #eee", paddingTop: 12, marginTop: 6 }}>
                <div style={{ fontWeight: 600, color: "#444", marginBottom: 8 }}>Direction</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input placeholder="Nom du directeur" value={centerForm.directionName} onChange={(e) => setCenterForm({ ...centerForm, directionName: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                  <input placeholder="Rôle (ex: Directeur)" value={centerForm.directionRole} onChange={(e) => setCenterForm({ ...centerForm, directionRole: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                  <input placeholder="Email(s) séparés par , " value={centerForm.directionEmail} onChange={(e) => setCenterForm({ ...centerForm, directionEmail: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                  <input placeholder="Téléphone(s) séparés par ," value={centerForm.directionPhone} onChange={(e) => setCenterForm({ ...centerForm, directionPhone: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
                </div>
              </div>

              <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>Saisissez chaque entrée sur une nouvelle ligne ↓</div>
              <textarea placeholder="Domaines d'intervention (un par ligne)" rows={3} value={centerForm.domaineInterventions} onChange={(e) => setCenterForm({ ...centerForm, domaineInterventions: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <textarea placeholder="Études réalisées (une par ligne)" rows={3} value={centerForm.etudesRealisees} onChange={(e) => setCenterForm({ ...centerForm, etudesRealisees: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <textarea placeholder="Partenaires (un par ligne)" rows={3} value={centerForm.partenaires} onChange={(e) => setCenterForm({ ...centerForm, partenaires: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />
              <textarea placeholder="Contacts (un par ligne : téléphone, site web, etc.)" rows={2} value={centerForm.contacts} onChange={(e) => setCenterForm({ ...centerForm, contacts: e.target.value })} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }} />

              <div>
                <div style={{ fontSize: 13, color: "#444", marginBottom: 6, fontWeight: 500 }}>Profil détaillé (HTML)</div>
                <RichEditor value={centerForm.profile} onChange={(html) => setCenterForm({ ...centerForm, profile: html })} folder="ulpgl/uploads" placeholder="Présentation longue du centre..." />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setCenterModal(false)} style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>Annuler</button>
              <button data-testid="center-save-button" onClick={saveCenter} style={{ padding: "10px 22px", background: Colors.primaryColor, color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
                {editingCenter ? "Mettre à jour" : isAdmin ? "Publier" : "Soumettre"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User modal */}
      {userModal && (
        <div onClick={() => setUserModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} data-testid="create-user-modal" style={{ background: "white", borderRadius: 10, maxWidth: 520, width: "100%", padding: 28 }}>
            <h3 style={{ marginTop: 0, color: Colors.primaryColor }}>Créer un compte utilisateur</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <input data-testid="user-name-input" placeholder="Nom complet" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6 }} />
              <input data-testid="user-email-input" type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6 }} />
              <input data-testid="user-password-input" type="password" placeholder="Mot de passe (min. 6)" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6 }} />
              <select data-testid="user-role-select" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
                <option value="faculty_publisher">Publieur faculté</option>
                <option value="super_admin">Super administrateur</option>
              </select>
              {userForm.role === "faculty_publisher" && (
                <select data-testid="user-faculty-select" value={userForm.facultyId} onChange={(e) => setUserForm({ ...userForm, facultyId: e.target.value })} style={{ padding: 11, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
                  <option value="">— Sélectionner une faculté —</option>
                  {faculties.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
              <button onClick={() => setUserModal(false)} style={{ padding: "10px 18px", background: "#eee", border: "none", borderRadius: 6, cursor: "pointer" }}>Annuler</button>
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
