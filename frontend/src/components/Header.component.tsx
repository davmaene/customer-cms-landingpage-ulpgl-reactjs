import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Colors } from "../utils/utils.colors";
import { ContactBlock } from "./subcomponents/Contactblock";
import { Logo } from "./subcomponents/Logo";
import { MainNavigation } from "./subcomponents/Navigation";
import { TopNavigation } from "./subcomponents/TopNavigationButton";
import { FaEnvelope } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { GiPhone } from "react-icons/gi";
import { NavItem } from "./subcomponents/NavItem";
import { APPCONTACTS } from "../utils/utils.constants";
import { IoIosArrowForward } from "react-icons/io";
import { FaMapMarkerAlt, FaUserShield } from "react-icons/fa";
import { routes } from "../utils/utils.routes";
import { ButtonComponent } from "./subcomponents/ButtonComponent";
import { useAuth } from "../contexts/AuthContext";

const MarkerIcon = FaMapMarkerAlt as any;
const EnvelopeIcon = FaEnvelope as any;
const PhoneIcon = GiPhone as any;
const SearchIcon = RiSearchLine as any;
const ArrowForward = IoIosArrowForward as any;
const ShieldIcon = FaUserShield as any;

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { user, isAdmin, isPublisher } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`${routes.SEARCH}?q=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
    }
  };

  return (
    <header
      className="site-header mb-0"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "white",
        paddingBottom: "2px",
        transition: "box-shadow 0.3s ease-in-out",
        boxShadow: isScrolled ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
      }}
    >
      <div className="top-bar w-100" style={{ backgroundColor: Colors.primaryColor, color: "white", padding: "8px 20px" }}>
        <div className="top-bar-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", flexWrap: "wrap", gap: 10 }}>
          <TopNavigation />
          <div className="top-right-actions" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {/* {user ? (
              <Link
                data-testid="header-dashboard-link"
                to={routes.ADMIN}
                style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}
              >
                <ShieldIcon /> {isAdmin ? "Admin" : "Publieur"} · {user.name?.split(" ")[0]}
              </Link>
            ) : (
              <Link data-testid="header-login-link" to={routes.LOGIN} style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>
                <ShieldIcon /> Connexion
              </Link>
            )} */}
            <NavItem href={routes.FAQ} label="FAQ" color={Colors.whiteColor} />
          </div>
        </div>
      </div>

      <div className="middle-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="col-lg-4">
          <Logo />
        </div>
        <div className="contact-info-blocks col-lg-8" style={{ display: "flex", gap: "40px", padding: "10px 20px", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <ContactBlock icon={<MarkerIcon color={Colors.redColor} />} label="Addresse" value={APPCONTACTS.address} />
          <ContactBlock icon={<EnvelopeIcon color={Colors.redColor} />} label="Email" value={APPCONTACTS.email[0]} />
          <ContactBlock icon={<PhoneIcon color={Colors.redColor} />} label="Téléphone" value={APPCONTACTS.phone[0]} />
        </div>
      </div>

      <div className="main-nav-container" style={{ display: "flex", alignItems: "stretch", marginBottom: "8px", justifyContent: "space-between", padding: "0 10px" }}>
        <div className="mega-menu-wrapper desktop-only-block">
          <a href="#" onClick={(e) => e.preventDefault()} style={{ border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ backgroundColor: Colors.darkColor, color: "white", padding: "15px 30px", display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "10px" }}>Plus d'infos</span>
              <span>
                <ArrowForward style={{ marginLeft: "10px" }} />
              </span>
            </div>
          </a>
          <div className="mega-menu-overlay">
            <div className="mega-menu-content">
              <div className="mega-menu-columns">
                <div className="mega-menu-column">
                  <h3>Nos Facultés</h3>
                  <ul>
                    <li>
                      <Link to={routes.FACULTIES}>Toutes les facultés</Link>
                    </li>
                    <li>
                      <Link to={routes.DOMAINES}>Domaines & filières</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>Publications</h3>
                  <ul>
                    <li><Link to={routes.ARTICLES}>Articles</Link></li>
                    <li><Link to={`${routes.ARTICLES}/evenement`}>Événements</Link></li>
                    <li><Link to={`${routes.ARTICLES}/activite`}>Activités</Link></li>
                    <li><Link to={routes.SCHEDULES}>Horaires & examens</Link></li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>Nos Centres</h3>
                  <ul>
                    <li><Link to={routes.CENTRES}>Tous les centres</Link></li>
                    <li><Link to={routes.BIBLIO}>Bibliothèque</Link></li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>Autres</h3>
                  <ul>
                    <li><Link to={routes.ABOUT}>À propos de nous</Link></li>
                    <li><Link to={routes.CONTACTS}>Nos contacts</Link></li>
                    <li><Link to={routes.FAQ}>Foire aux questions</Link></li>
                    <li><Link to={routes.SEARCH}>Recherche avancée</Link></li>
                    <li><Link to={routes.LOGIN}>Connexion Admin</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-navigation">
          <MainNavigation />
        </div>
        <form onSubmit={submitSearch} className="search-area desktop-only-block" style={{ display: "flex", alignItems: "stretch", border: "1px solid #ddd", overflow: "hidden", height: "54px" }}>
          <input
            data-testid="header-search-input"
            type="text"
            placeholder="Recherche..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ border: "none", lineHeight: "normal", background: "transparent", height: "100%", flex: 1, outline: "none", color: Colors.darkColor, padding: "0 14px" }}
          />
          <ButtonComponent label="" onClick={submitSearch as any} icon={<SearchIcon color={Colors.whiteColor} />} />
        </form>
      </div>
    </header>
  );
};
