import React, { useState, useEffect } from "react";
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
import { FaMapMarkerAlt } from "react-icons/fa";
import { routes } from "../utils/utils.routes";
import { ButtonComponent } from "./subcomponents/ButtonComponent";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import { shuffleArray } from "../utils/utils.fucntions";
import { Hrseparator } from "./subcomponents/Hrseparator";

const MarkerIcon = FaMapMarkerAlt as any;
const EnvelopeIcon = FaEnvelope as any;
const PhoneIcon = GiPhone as any;
const SearchIcon = RiSearchLine as any;
const ArrowForward = IoIosArrowForward as any;

export const Header: React.FC = () => {
  const { domainsData, centers, activities } = useData();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="site-header mb-0"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        paddingBottom: '2px',
        transition: 'box-shadow 0.3s ease-in-out',
        boxShadow: isScrolled ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
      }}
    >
      <div className="top-bar w-100" style={{ backgroundColor: Colors.primaryColor, color: 'white', padding: '10px 50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
          <TopNavigation />
          <div className="top-right-actions" style={{ display: 'flex', gap: '20px' }}>
            <NavItem href={routes.FAQ} label="FAQ" color={Colors.whiteColor} />
          </div>
        </div>
      </div>

      <div className="middle-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        <div className="col-lg-4">
          <Logo />
        </div>
        <div className="contact-info-blocks col-lg-8" style={{ display: 'flex', gap: '40px', padding: '10px 20px', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <ContactBlock icon={<MarkerIcon color={Colors.redColor} />} label="Addresse" value={APPCONTACTS.address} />
          <ContactBlock icon={<EnvelopeIcon color={Colors.redColor} />} label="Email" value={APPCONTACTS.email[0]} />
          <ContactBlock icon={<PhoneIcon color={Colors.redColor} />} label="Téléphone" value={APPCONTACTS.phone[0]} />
        </div>
      </div>

      <div className="main-nav-container" style={{ display: 'flex', alignItems: 'stretch', marginBottom: "8px", justifyContent: 'space-between', padding: '0 10px' }}>
        <div className="mega-menu-wrapper">
          <a href="#"
            style={{ border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{ backgroundColor: Colors.darkColor, color: 'white', padding: '15px 30px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>Plus d'infos</span>
              <span>
                <ArrowForward style={{ marginLeft: '10px' }} />
              </span>
            </div>
          </a>

          <div className="mega-menu-overlay">
            <div className="mega-menu-content">
              <div className="mega-menu-columns">
                <div className="mega-menu-column">
                  <h3>Nos Domaines</h3>
                  <ul>
                    {domainsData.map(domain => {
                      return <li><Link to={routes.DOMAINES.concat("/").concat(domain.href)}>{domain.domaine}</Link></li>
                    })}
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>Nos Centres</h3>
                  <ul>
                    {shuffleArray(centers)?.slice(0, 6)?.map(centre => {
                      return <li><Link to={routes.CENTRES.concat("/").concat(centre.href)}>{centre.title}</Link></li>
                    })}
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>Activités</h3>
                  <ul>
                    {activities.map(activ => <li><Link to={routes.CENTRES.concat("/").concat(activ.link)}>{activ.name}</Link></li>)}
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h3>Autres</h3>
                  <ul>
                    <li><Link to={routes.ABOUT}>A propos de nous</Link></li>
                    <li><Link to={routes.CONTACTS}>Nos contacts</Link></li>
                    <li><Link to={routes.FAQ}>Foire aux question</Link></li>
                    <li><Link to={routes.COMPLAINTS}>Système des plaintes</Link></li>
                    <li><Link to={routes.TFE}>Système de gestion des TFE</Link></li>
                    <li><Link to={routes.LIBRARY}>Bibliothèque</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-navigation">
          <MainNavigation />
        </div>
        <div className="search-area" style={{
          display: 'flex',
          alignItems: 'stretch',
          border: '1px solid #ddd',
          overflow: 'hidden',
          height: '54px',
        }}>
          <input
            type="text"
            placeholder="Recherche..."
            style={{
              border: 'none',
              lineHeight: 'normal',
              background: 'transparent',
              height: '100%',
              flex: 1,
              outline: 'none',
              color: Colors.darkColor,
            }}
          />
          <ButtonComponent label="" onClick={() => { }} icon={<SearchIcon color={Colors.whiteColor} />} />
        </div>
      </div>
    </header>
  );
};

