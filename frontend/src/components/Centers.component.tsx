import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { ExploreCenterCard } from "./subcomponents/ExploreCenterCard";
import { routes } from "../utils/utils.routes";
import { LoadingComponent } from "./subcomponents/LoadingComponent";

export const ExploreCenters: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/centers")
      .then((d) =>
        setItems(
          (d.rows || []).map((c: any) => ({
            flug: c.slug,
            title: c.title,
            images: c.images || [],
            href: `${routes.CENTRES}/${c.slug}`,
            description: c.description,
            domaineInterventions: c.domaineInterventions || [],
            direction: c.direction,
            profile: c.profile,
            partenaires: c.partenaires || [],
            etudesRealisees: c.etudesRealisees || [],
            contacts: c.contacts || [],
          }))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div style={{ height: "51px" }} aria-hidden="true" className="wp-block-spacer"></div>

      <div id="explore" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-layout-container">
        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: "50%" }}>
            <h2 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-max-48-font-size">
              Nos centres de recherche
            </h2>
            <p className="has-tertiary-color has-text-color">
              De l'innovation technologique à la gestion économique, découvrez nos pôles d'expertise.
            </p>
          </div>
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: "50%" }}></div>
        </div>

        <div style={{ height: "46px" }} aria-hidden="true" className="wp-block-spacer"></div>

        {loading ? (
          <LoadingComponent />
        ) : items.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center", padding: 40 }}>Aucun centre publié pour le moment.</p>
        ) : (
          <div className="explore-grid" data-testid="centers-grid">
            {items.map((item, index) => (
              <ExploreCenterCard key={index} {...item} />
            ))}
          </div>
        )}

        <div style={{ height: "100px" }} aria-hidden="true" className="wp-block-spacer"></div>
      </div>
    </>
  );
};
