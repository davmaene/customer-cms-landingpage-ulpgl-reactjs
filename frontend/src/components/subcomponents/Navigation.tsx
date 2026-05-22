import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../utils/utils.colors";
import { routes } from "../../utils/utils.routes";
import { NavItem } from "./NavItem";
import { CiMenuFries } from "react-icons/ci";
import { RiSearchLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { apiGet } from "../../utils/api";

const MenuIcon = CiMenuFries as any;
const SearchIcon = RiSearchLine as any;

export const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => closeMenu(), [location.pathname]);

  useEffect(() => {
    apiGet("/faculties").then((d) => setFaculties(d.rows || [])).catch(() => { });
  }, []);

  const facultySubItems = faculties.map((fac) => ({
    label: fac.name,
    href: `${routes.FACULTIES}/${fac.slug}`,
    subItems: (fac.filieres || []).map((fil: any) => ({
      label: fil.name,
      href: `${routes.FACULTIES}/${fac.slug}`,
    })),
  }));

  const submitMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`${routes.SEARCH}?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      closeMenu();
    }
  };

  return (
    <nav
      style={{ fontStyle: "normal", fontWeight: "500" }}
      className={`is-responsive items-justified-left wp-block-navigation is-horizontal ${isMenuOpen ? "has-modal-open" : ""}`}
      aria-label="Main"
    >
      <button
        data-testid="mobile-menu-toggle"
        aria-haspopup="dialog"
        aria-label="Open menu"
        className="wp-block-navigation__responsive-container-open"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </button>

      <div
        className={`wp-block-navigation__responsive-container ${isMenuOpen ? "is-menu-open has-modal-open" : ""}`}
        id="modal-2"
        style={{ display: isMenuOpen ? "block" : undefined }}
      >
        <div className="wp-block-navigation__responsive-close" tabIndex={-1}>
          <div className="wp-block-navigation__responsive-dialog">
            <button
              data-testid="mobile-menu-close"
              aria-label="Close menu"
              className="wp-block-navigation__responsive-container-close"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
                <path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>
              </svg>
            </button>

            <div className="wp-block-navigation__responsive-container-content" id="modal-2-content">
              <ul className="wp-block-navigation__container is-responsive items-justified-center wp-block-navigation">
                <NavItem href={routes.HOME} label="Accueil" color={Colors.darkColor} />
                <NavItem
                  href={routes.FACULTIES}
                  label="Facultés"
                  color={Colors.darkColor}
                  hasPlus
                  subItems={facultySubItems}
                />
                {/* <NavItem href={routes.DOMAINES} label="Domaines" color={Colors.darkColor} /> */}
                <NavItem href={routes.CENTRES} label="Centres" color={Colors.darkColor} />
                <NavItem href={routes.SCHEDULES} label="Horaires" color={Colors.darkColor} />
                <NavItem href={routes.ARTICLES} label="Articles" color={Colors.darkColor} />
                <NavItem href={`${routes.ARTICLES}/evenement`} label="Événements" color={Colors.darkColor} />
                <NavItem href={`${routes.ARTICLES}/activite`} label="Activités" color={Colors.darkColor} />
                <NavItem href={routes.CONTACTS} label="Contact" color={Colors.darkColor} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
