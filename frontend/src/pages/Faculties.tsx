import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BreadcrumpComponent } from "../components/subcomponents/BreadcrumpCompont";
import bigCover from "../assets/images/big-cover.jpg";
import { apiGet } from "../utils/api";
import { Colors } from "../utils/utils.colors";
import { routes } from "../utils/utils.routes";
import { LoadingComponent } from "../components/subcomponents/LoadingComponent";

export const Faculties: React.FC = () => {
  const [faculties, setFaculties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/faculties").then((d) => setFaculties(d.rows)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <BreadcrumpComponent
        imageCover={bigCover}
        title="Nos Facultés"
        subtitle="Découvrez l'ensemble des facultés de l'ULPGL-Goma, chacune offrant des programmes d'excellence pour préparer les leaders de demain."
      />
      <div className="wp-block-group has-global-padding is-layout-constrained" style={{ paddingTop: 60, paddingBottom: 60 }}>
        {loading ? (
          <LoadingComponent />
        ) : (
          <div data-testid="faculties-grid" className="explore-grid" style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {faculties.map((fac) => (
              <Link
                key={fac.id}
                to={`${routes.FACULTIES}/${fac.slug}`}
                data-testid={`faculty-card-${fac.slug}`}
                style={{
                  display: "block",
                  background: "white",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  borderTop: `4px solid ${Colors.primaryColor}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 30px rgba(0,0,0,0.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 11, color: Colors.redColor, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{fac.domaine}</div>
                  <h3 style={{ color: Colors.darkColor, margin: "10px 0 12px", fontSize: 19, lineHeight: 1.35 }}>{fac.name}</h3>
                  <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, minHeight: 60 }}>{(fac.description || "").slice(0, 140)}...</p>
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #eee", fontSize: 13, color: "#444" }}>
                    <div><b>Doyen :</b> {fac.dean || "—"}</div>
                    <div style={{ marginTop: 4 }}><b>{fac.filieres?.length || 0}</b> filière(s)</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
