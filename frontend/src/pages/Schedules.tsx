import React, { useEffect, useState } from "react";
import { BreadcrumpComponent } from "../components/subcomponents/BreadcrumpCompont";
import bigCover from "../assets/images/big-cover.jpg";
import { apiGet } from "../utils/api";
import { Colors } from "../utils/utils.colors";
import { LoadingComponent } from "../components/subcomponents/LoadingComponent";
import { FiClock, FiMapPin, FiDownload, FiBook } from "react-icons/fi";

const ClockI = FiClock as any;
const MapI = FiMapPin as any;
const DownloadI = FiDownload as any;
const BookI = FiBook as any;

const PROMOTIONS = ["L1", "L2", "L3", "M1", "M2"];

export const SchedulesPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({ type: "", facultyId: "", promotion: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/faculties").then((d) => setFaculties(d.rows)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (filters.type) params.type = filters.type;
    if (filters.facultyId) params.facultyId = filters.facultyId;
    if (filters.promotion) params.promotion = filters.promotion;
    apiGet("/schedules", params).then((d) => setItems(d.rows)).finally(() => setLoading(false));
  }, [filters]);

  return (
    <>
      <BreadcrumpComponent
        imageCover={bigCover}
        title="Horaires des cours & examens"
        subtitle="Consultez les horaires académiques publiés par faculté et promotion."
      />
      <div className="wp-block-group has-global-padding is-layout-constrained" style={{ paddingTop: 40, paddingBottom: 60 }}>
        {/* Filters */}
        <div data-testid="schedules-filters" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 26, padding: 16, background: "white", borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
          <select data-testid="filter-type" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} style={{ flex: 1, minWidth: 180, padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
            <option value="">Tous les types</option>
            <option value="cours">Cours</option>
            <option value="examen">Examens</option>
          </select>
          <select data-testid="filter-faculty" value={filters.facultyId} onChange={(e) => setFilters({ ...filters, facultyId: e.target.value })} style={{ flex: 1, minWidth: 220, padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
            <option value="">Toutes les facultés</option>
            {faculties.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
          <select data-testid="filter-promotion" value={filters.promotion} onChange={(e) => setFilters({ ...filters, promotion: e.target.value })} style={{ flex: 1, minWidth: 140, padding: 10, border: "1px solid #ddd", borderRadius: 6, background: "white" }}>
            <option value="">Toutes promotions</option>
            {PROMOTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {loading ? (
          <LoadingComponent />
        ) : items.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center", padding: "40px 0" }}>Aucun horaire publié pour ces critères.</p>
        ) : (
          <div data-testid="schedules-list" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {items.map((s) => (
              <div key={s.id} data-testid={`schedule-card-${s.id}`} style={{ background: "white", borderRadius: 10, padding: 20, boxShadow: "0 4px 14px rgba(0,0,0,0.07)", borderTop: `4px solid ${s.type === "examen" ? Colors.redColor : Colors.primaryColor}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ background: s.type === "examen" ? Colors.redColor : Colors.primaryColor, color: "white", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>
                    {s.type}
                  </span>
                  <span style={{ background: "#f0f1f5", color: "#333", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                    {s.promotion}
                  </span>
                  {s.semester && <span style={{ fontSize: 11, color: "#666" }}>· {s.semester}</span>}
                </div>
                <h4 style={{ color: Colors.darkColor, fontSize: 16, marginBottom: 6, lineHeight: 1.4 }}>{s.title}</h4>
                <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}><BookI size={13} /> {s.faculty?.name}</div>
                {s.filiere?.name && <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{s.filiere.name}</div>}
                {s.academicYear && <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Année {s.academicYear}</div>}
                {s.startDate && (
                  <div style={{ fontSize: 13, color: "#444", marginBottom: 4 }}>
                    <ClockI size={13} /> {new Date(s.startDate).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}
                    {s.endDate && ` → ${new Date(s.endDate).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}`}
                  </div>
                )}
                {s.location && (
                  <div style={{ fontSize: 13, color: "#444", marginBottom: 8 }}>
                    <MapI size={13} /> {s.location}
                  </div>
                )}
                {s.description && <p style={{ fontSize: 13, color: "#555", marginTop: 8 }}>{s.description}</p>}
                {s.fileUrl && (
                  <a
                    href={s.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`schedule-download-${s.id}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, padding: "8px 14px", background: Colors.primaryColor, color: "white", borderRadius: 6, textDecoration: "none", fontSize: 13, fontWeight: 500 }}
                  >
                    <DownloadI size={14} /> Voir le document
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
