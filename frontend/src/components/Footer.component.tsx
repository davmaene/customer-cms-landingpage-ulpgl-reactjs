import React, { useState } from "react";
import { Link } from "react-router-dom";
import { APPDNS, APPNAME, APPCREATOR } from "../utils/utils.constants";
import { routes } from "../utils/utils.routes";
import { SocialLinks } from "./subcomponents/SocialLinks";
import { IoIosArrowForward } from "react-icons/io";
import { apiPost } from "../utils/api";
import { toast } from "react-toastify";

const ArrowForward = IoIosArrowForward as any;

const FooterColumn: React.FC<{
  title: string;
  links: Array<{ href: string; label: string; current?: boolean; isExternal?: boolean }>;
}> = ({ title, links }) => (
  <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
    <h3 className="wp-block-heading has-white-color has-text-color-inherit" style={{ marginBottom: "var(--wp--preset--spacing--50)" }}>
      {title}
    </h3>
    <ul className="wp-block-page-list" style={{ listStyleType: "none", paddingLeft: 0 }}>
      {links.map((link, index) => (
        <li key={index} className={`wp-block-pages-list__item pt-3 ${link.current ? "current-menu-item menu-item-home" : ""}`}>
          <Link
            className="wp-block-pages-list__item__link"
            to={link.href}
            {...(link.current && { "aria-current": "page" })}
            target={link.isExternal ? "_blank" : "_self"}
          >
            <ArrowForward style={{ marginRight: "10px", fontSize: 11 }} />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await apiPost("/newsletter", { email: email.trim() });
      toast.success(res.message || "Inscription réussie");
      setEmail("");
    } catch (err: any) {
      toast.error(err?.response?.data?.reason || err?.messageText || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="site-footer wp-block-template-part">
      <div
        className="wp-block-group alignfull is-style-default has-white-color has-header-footer-background-color has-text-color has-background has-link-color has-small-font-size has-global-padding is-layout-constrained wp-block-group-is-layout-constrained"
        style={{ marginTop: "0px", paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
            <h2 className="wp-block-heading has-white-color has-text-color has-max-36-font-size" style={{ marginBottom: "var(--wp--preset--spacing--50)" }}>
              {APPNAME}
            </h2>
            <p>
              Nous sommes l'Université Libre des Pays des Grands Lacs (ULPGL), une université Chrétienne des Eglises Protestantes des Pays de Grands Lacs, privée et agréée par le Gouvernement congolais.
            </p>
            <hr className="wp-block-separator has-text-color has-lightgrey-color has-alpha-channel-opacity has-lightgrey-background-color has-background is-style-wide" style={{ marginTop: "15px", marginBottom: "0px" }} />
            <SocialLinks />
          </div>

          <FooterColumn
            title="Liens rapides"
            links={[
              { href: routes.HOME, label: "Page d'accueil", current: true },
              { href: routes.ABOUT, label: "À propos" },
              { href: routes.FACULTIES, label: "Facultés" },
              { href: routes.DOMAINES, label: "Domaines" },
              { href: routes.METANOIA, label: "Métanoia" },
              { href: routes.CONTACTS, label: "Contacts" },
            ]}
          />

          <FooterColumn
            title="Ressources"
            links={[
              { href: routes.ARTICLES, label: "Blog et Articles" },
              { href: routes.CENTRES, label: "Centres de recherche" },
              { href: routes.SEARCH, label: "Recherche" },
              { href: routes.ANCIENS, label: "Anciens de l'" + APPNAME, isExternal: true },
              { href: routes.COMPLAINTS, label: "Plaintes", isExternal: true },
              { href: routes.LIBRARY, label: "Bibliothèque", isExternal: true },
              { href: routes.LOGIN, label: "Admin site", isExternal: false },
            ]}
          />

          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
            <h3 className="wp-block-heading has-white-color has-text-color" style={{ marginBottom: "var(--wp--preset--spacing--50)" }}>
              Newsletter
            </h3>
            <p>Inscrivez-vous avec votre adresse e-mail pour recevoir nos actualités hebdomadaires et des notifications sur nos articles.</p>
            <form onSubmit={subscribe} data-testid="newsletter-form">
              <input
                data-testid="newsletter-email-input"
                type="email"
                placeholder="Adresse email"
                name="mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input data-testid="newsletter-submit-button" type="submit" value={loading ? "Inscription..." : "Souscrire"} disabled={loading} />
            </form>
          </div>
        </div>

        <hr className="wp-block-separator has-text-color has-alpha-channel-opacity has-background is-style-wide" style={{ backgroundColor: "#ffffff24", color: "#ffffff24" }} />

        <div className="wp-block-group is-content-justification-space-between is-layout-flex wp-block-group-is-layout-flex">
          <p className="has-tertiary-color has-text-color">Copyright &copy; {new Date().getFullYear()} {APPNAME}</p>
          <p className="has-tertiary-color has-text-color">
            Designed by{" "}
            <a href={APPDNS} className="text-white" target="_blank" rel="noreferrer noopener">
              {APPCREATOR}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
