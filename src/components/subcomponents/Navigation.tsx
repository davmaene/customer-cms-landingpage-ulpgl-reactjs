import React, { useEffect, useState } from "react"; // 1. Ajout de useState
import { Colors } from "../../utils/utils.colors";
import { routes } from "../../utils/utils.routes";
import { useData } from "../../contexts/DataContext";
import { NavItem } from "./NavItem";
import { CiMenuFries } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const MenuIcon = CiMenuFries as any;

export const MainNavigation: React.FC = () => {
    const { domainsData, centers, activities } = useData();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        closeMenu();
    }, [location.pathname]);

    return (
        <nav
            style={{ fontStyle: 'normal', fontWeight: '500' }}
            className={`is-responsive items-justified-left wp-block-navigation is-horizontal ${isMenuOpen ? 'has-modal-open' : ''}`}
            aria-label="Main"
        >
            <button
                aria-haspopup="dialog"
                aria-label="Open menu"
                className="wp-block-navigation__responsive-container-open"
                onClick={toggleMenu}
            >
                <MenuIcon />
            </button>

            <div
                className={`wp-block-navigation__responsive-container ${isMenuOpen ? 'is-menu-open has-modal-open' : ''}`}
                id="modal-2"
                style={{ display: isMenuOpen ? 'block' : undefined }}
            >
                <div className="wp-block-navigation__responsive-close" tabIndex={-1}>
                    <div className="wp-block-navigation__responsive-dialog">

                        {/* Bouton Fermer */}
                        <button
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
                                    href={routes.DOMAINES}
                                    label="Domaines"
                                    color={Colors.darkColor}
                                    hasPlus
                                    subItems={domainsData.map(domaine => ({
                                        label: domaine.domaine,
                                        href: "#",
                                        subItems: domaine.faculties.map(faculty => ({
                                            label: faculty.faculte,
                                            href: '#',
                                            subItems: faculty.filiaires.map(filiere => ({
                                                label: filiere.filiere,
                                                href: `${faculty.href}/${filiere.filiere.toLowerCase()}`
                                            }))
                                        }))
                                    }))}
                                />

                                <NavItem href={routes.CENTRES}
                                    label="Centres"
                                    color={Colors.darkColor}
                                    hasPlus
                                    subItems={centers.map(center => ({
                                        label: center.title,
                                        href: center.href,
                                        state: { item: center }
                                    }))}
                                />

                                <NavItem
                                    href={"#"}
                                    label="Activités"
                                    color={Colors.darkColor}
                                    subItems={activities.map(activity => ({
                                        label: activity.name,
                                        href: activity.link
                                    }))}
                                />

                                <NavItem href={routes.ARTICLES} label="Articles" color={Colors.darkColor} />
                                <NavItem href={routes.CONTACTS} label="Nos Contacts" color={Colors.darkColor} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};