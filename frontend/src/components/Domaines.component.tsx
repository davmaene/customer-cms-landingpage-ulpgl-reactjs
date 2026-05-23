import { routes } from "../utils/utils.routes";
import { domainsData } from "../utils/utils.statiquedata";
import { DomaineItem } from "./subcomponents/DomaineItemComponent";

export const DomainesSection: React.FC = () => {

  const educationIcon = (
    <div className="wp-block-outermost-icon-block">
      <div className="icon-container" style={{ width: '36px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
        <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M2.90918 9.03273V23.4473C4.56736 22.8509 6.26918 22.5455 8.00009 22.5455C9.731 22.5455 11.4328 22.8509 13.091 23.4473V9.04727C11.4765 8.36364 9.74554 8 8.00009 8C6.22554 8 4.52373 8.34909 2.90918 9.03273Z" fill="var(--wp--preset--color--secondary)"></path>
          <path d="M26.1819 0L18.9092 7.27273V21.0909L26.1819 14.5455V0Z" fill="var(--wp--preset--color--secondary)"></path>
          <path d="M31.2291 6.83725C30.5455 6.48816 29.8327 6.19725 29.0909 5.94998V23.4482C27.4327 22.8518 25.7309 22.5463 24 22.5463C21.2364 22.5463 18.5018 23.3318 16 24.8445V7.24452C13.6436 5.8918 10.9236 5.0918 8 5.0918C5.39636 5.0918 2.93818 5.7318 0.770909 6.83725C0.290909 7.06998 0 7.57907 0 8.11725V25.6882C0 26.5318 0.683636 27.1282 1.45455 27.1282C1.68727 27.1282 1.92 27.07 2.15273 26.9536C3.91273 26.0373 5.89091 25.4554 8 25.4554C11.0109 25.4554 13.7891 26.6482 16 28.3645C18.2109 26.6482 20.9891 25.4554 24 25.4554C26.1091 25.4554 28.0873 26.0373 29.8473 26.9682C30.08 27.0845 30.3127 27.1427 30.5455 27.1427C31.3018 27.1427 32 26.5463 32 25.7027V8.11725C32 7.57907 31.7091 7.06998 31.2291 6.83725ZM13.0909 23.4482C11.4327 22.8518 9.73091 22.5463 8 22.5463C6.26909 22.5463 4.56727 22.8518 2.90909 23.4482V9.03361C4.52364 8.34998 6.22545 8.00089 8 8.00089C9.74545 8.00089 11.4764 8.36452 13.0909 9.04816V23.4482Z" fill="var(--wp--preset--color--secondary)"></path>
        </svg>
      </div>
    </div>
  );

  return (
    <div id="links-3col" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-layout-container">
      <div style={{ marginTop: 0, marginBottom: 0, height: '120px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
          <h2 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-max-48-font-size">
            Nos domaines de formation
          </h2>
          <p className="has-tertiary-color has-text-color">
            Une offre académique diversifiée pour un apprentissage complet. Parcourez nos différents programmes et choisissez la voie de votre spécialisation.
          </p>
        </div>
        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
      </div>

      <div style={{ height: '46px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div
        className="explore-grid"
      // style={{ borderRadius: '0px', display: "grid", gridTemplateColumns: 'repeat(2, 1fr)', gap: "20px" }}
      >
        {domainsData.map((domain, index) => (
          <DomaineItem
            key={index}
            icon={educationIcon}
            title={domain.domaine}
            links={Array.from(domain.faculties.map(f => ({ text: f.faculte, href: String(routes.FACULTIES).concat(f.href) })))}
          />
        ))}
      </div>
      <div className="wp-block-group alignfull has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" style={{ marginTop: '0px' }}>
        <div style={{ marginTop: 0, marginBottom: 0, height: '120px' }} aria-hidden="true" className="wp-block-spacer"></div>
      </div>
    </div>
  );
};