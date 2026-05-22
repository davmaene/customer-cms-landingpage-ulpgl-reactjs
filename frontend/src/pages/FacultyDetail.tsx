import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BreadcrumpComponent } from "../components/subcomponents/BreadcrumpCompont";
import bigCover from "../assets/images/big-cover.jpg";
import { apiGet } from "../utils/api";
import { Colors } from "../utils/utils.colors";
import { routes } from "../utils/utils.routes";
import { LoadingComponent } from "../components/subcomponents/LoadingComponent";
import { FaGraduationCap, FaUserTie, FaUsers, FaClock, FaCertificate } from "react-icons/fa";

const GradI = FaGraduationCap as any;
const TieI = FaUserTie as any;
const UsersI = FaUsers as any;
const ClockI = FaClock as any;
const CertI = FaCertificate as any;

export const FacultyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [faculty, setFaculty] = useState<any>(null);
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    apiGet(`/faculties/${slug}`)
      .then(async (d) => {
        setFaculty(d.item);
        const list = await apiGet("/contents", { facultyId: d.item.id, limit: 6 });
        setContents(list.rows);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingComponent />;
  if (!faculty) {
    return (
      <div style={{ padding: 80, textAlign: "center" }}>
        <h2>Faculté introuvable</h2>
        <Link to={routes.FACULTIES} style={{ color: Colors.primaryColor }}>← Toutes les facultés</Link>
      </div>
    );
  }

  return (
    <>
      <BreadcrumpComponent imageCover={bigCover} title={faculty.name} subtitle={faculty.domaine} />
      <div className="wp-block-group has-global-padding is-layout-constrained" style={{ paddingTop: 50, paddingBottom: 60 }}>
        <div className="row g-4">
          <div className="col-lg-8">
            <h2 style={{ color: Colors.primaryColor, fontSize: 28, fontWeight: 700 }}>Présentation</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#444" }}>{faculty.description}</p>

            <h3 style={{ color: Colors.primaryColor, marginTop: 40, fontSize: 22 }}>Nos filières</h3>
            <div data-testid="filieres-list" style={{ display: "grid", gap: 16, marginTop: 16 }}>
              {(faculty.filieres || []).map((f: any) => (
                <div key={f.id} data-testid={`filiere-${f.slug}`} style={{ background: "white", padding: 20, borderRadius: 10, borderLeft: `4px solid ${Colors.redColor}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <h4 style={{ color: Colors.darkColor, fontSize: 18, marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
                    <GradI color={Colors.primaryColor} /> {f.name}
                  </h4>
                  {f.description && <p style={{ color: "#666", marginBottom: 10 }}>{f.description}</p>}
                  <div style={{ display: "flex", gap: 18, fontSize: 13, color: "#555", flexWrap: "wrap" }}>
                    {f.duration && <span><ClockI /> Durée : <b>{f.duration}</b></span>}
                    {f.diploma && <span><CertI /> Diplôme : <b>{f.diploma}</b></span>}
                  </div>
                </div>
              ))}
              {(!faculty.filieres || faculty.filieres.length === 0) && <p style={{ color: "#888" }}>Aucune filière disponible.</p>}
            </div>

            {contents.length > 0 && (
              <>
                <h3 style={{ color: Colors.primaryColor, marginTop: 50, fontSize: 22 }}>Actualités de la faculté</h3>
                <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                  {contents.map((c) => (
                    <Link key={c.id} to={`${routes.ARTICLESDETAILS}/${c.slug}`} style={{ display: "flex", gap: 14, background: "white", padding: 14, borderRadius: 8, textDecoration: "none", color: "inherit", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                      {c.coverImage && <img src={c.coverImage} alt="" style={{ width: 110, height: 80, objectFit: "cover", borderRadius: 6 }} />}
                      <div>
                        <div style={{ fontSize: 11, color: Colors.redColor, textTransform: "uppercase", fontWeight: 600 }}>{c.type}</div>
                        <h5 style={{ margin: "4px 0", color: Colors.darkColor }}>{c.title}</h5>
                        <p style={{ fontSize: 13, color: "#666", margin: 0 }}>{(c.excerpt || "").slice(0, 110)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="col-lg-4">
            <div style={{ background: Colors.primaryColor, color: "white", padding: 24, borderRadius: 10, marginBottom: 20 }}>
              <h4 style={{ color: "white", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 10 }}>Direction</h4>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 14 }}>
                <TieI size={20} />
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>Doyen</div>
                  <div style={{ fontWeight: 600 }}>{faculty.dean || "—"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 16 }}>
                <UsersI size={20} />
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>Secrétariat</div>
                  <div style={{ fontWeight: 600 }}>{faculty.secretary || "—"}</div>
                </div>
              </div>
            </div>
            <div style={{ background: "white", padding: 20, borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <h5 style={{ color: Colors.primaryColor }}>Domaine</h5>
              <p style={{ color: "#444", marginBottom: 0 }}>{faculty.domaine}</p>
            </div>
            <div style={{ marginTop: 18 }}>
              <Link to={routes.FACULTIES} style={{ color: Colors.primaryColor, textDecoration: "none", fontWeight: 600 }}>← Toutes les facultés</Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};
