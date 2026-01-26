import { Logo } from "./subcomponents/Logo";
import { MainNavigation } from "./subcomponents/Navigation";
import { NavItem } from "./subcomponents/NavItem";

export const Header: React.FC = () => {
  return (
    <header className="site-header wp-block-template-part">
      <div className="wp-block-group alignfull is-style-default has-global-padding is-layout-constrained wp-container-core-group-is-layout-9f697be6 wp-block-group-is-layout-constrained"
        style={{ marginTop: '0px', paddingTop: '20px', paddingRight: '30px', paddingBottom: '30px', paddingLeft: '30px' }}>
        <TopNavigation />
        <hr
          className="wp-block-separator has-text-color has-lightgrey-color has-alpha-channel-opacity has-lightgrey-background-color has-background is-style-wide"
          style={{ marginTop: '15px', marginBottom: '0px' }}
        />
        <MainHeaderContent />
      </div>
    </header>
  );
};

const TopNavigation: React.FC = () => {
  return (
    <nav className="has-small-font-size is-responsive items-justified-right wp-block-navigation is-content-justification-right is-layout-flex wp-container-core-navigation-is-layout-d445cf74 wp-block-navigation-is-layout-flex"
      aria-label="Navigate" data-wp-interactive="core/navigation"
      data-wp-context="{&quot;overlayOpenedBy&quot;:{&quot;click&quot;:false,&quot;hover&quot;:false,&quot;focus&quot;:false},&quot;type&quot;:&quot;overlay&quot;,&quot;roleAttribute&quot;:&quot;&quot;,&quot;ariaLabel&quot;:&quot;Menu&quot;}">

      <button aria-haspopup="dialog" aria-label="Open menu"
        className="wp-block-navigation__responsive-container-open"
        data-wp-on--click="actions.openMenuOnClick" data-wp-on--keydown="actions.handleMenuKeydown">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          aria-hidden="true" focusable="false">
          <path d="M4 7.5h16v1.5H4z"></path>
          <path d="M4 15h16v1.5H4z"></path>
        </svg>
      </button>

      <div className="wp-block-navigation__responsive-container" id="modal-1"
        data-wp-class--has-modal-open="state.isMenuOpen" data-wp-class--is-menu-open="state.isMenuOpen"
        data-wp-watch="callbacks.initMenu" data-wp-on--keydown="actions.handleMenuKeydown"
        data-wp-on--focusout="actions.handleMenuFocusout" tabIndex={-1}>

        <div className="wp-block-navigation__responsive-close" tabIndex={-1}>
          <div className="wp-block-navigation__responsive-dialog"
            data-wp-bind--aria-modal="state.ariaModal" data-wp-bind--aria-label="state.ariaLabel"
            data-wp-bind--role="state.roleAttribute">

            <button aria-label="Close menu" className="wp-block-navigation__responsive-container-close"
              data-wp-on--click="actions.closeMenuOnClick">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
                <path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>
              </svg>
            </button>

            <div className="wp-block-navigation__responsive-container-content"
              data-wp-watch="callbacks.focusFirstElement" id="modal-1-content">
              <ul className="wp-block-navigation__container has-small-font-size is-responsive items-justified-right wp-block-navigation has-small-font-size">
                <NavItem href="campus-2/index.html" label="Campus" />
                <NavItem href="about/index.html" label="About" />
                <NavItem href="contact/index.html" label="Contact" />
                <NavItem href="privacy-policy/index.html" label="Privacy Policy" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MainHeaderContent: React.FC = () => {
  return (
    <div className="wp-block-group is-content-justification-space-between is-nowrap is-layout-flex wp-container-core-group-is-layout-cb46ffcb wp-block-group-is-layout-flex">
      <Logo />
      <MainNavigation />
      <ApplyButton />
    </div>
  );
};

const ApplyButton: React.FC = () => {
  return (
    <div className="wp-block-group wpz-hide-mobile is-content-justification-left is-nowrap is-layout-flex wp-container-core-group-is-layout-fc9f69e7 wp-block-group-is-layout-flex">
      <div className="wp-block-outermost-icon-block"
        style={{ marginBottom: 0, marginLeft: 0, marginRight: 0, marginTop: 0 }}>
        <div className="icon-container has-icon-color"
          style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, color: 'var(--wp--preset--color--secondary)', width: '27px' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M16.08 13.3604L6.66663 22.7737V24.0004H7.89329L17.3066 14.587L16.08 13.3604Z" fill="var(--wp--preset--color--secondary)"></path>
            <path d="M20 21.3335L14.6667 26.6669H28V21.3335H20ZM16.08 9.58685L4 21.6669V26.6669H9L21.08 14.5869L16.08 9.58685ZM7.89333 24.0002H6.66667V22.7735L16.08 13.3602L17.3067 14.5869L7.89333 24.0002ZM24.9467 10.7202C25.0703 10.5968 25.1683 10.4503 25.2352 10.289C25.3022 10.1277 25.3366 9.95481 25.3366 9.78019C25.3366 9.60556 25.3022 9.43265 25.2352 9.27135C25.1683 9.11006 25.0703 8.96354 24.9467 8.84019L21.8267 5.72019C21.5767 5.47217 21.2388 5.33301 20.8867 5.33301C20.5345 5.33301 20.1967 5.47217 19.9467 5.72019L17.5067 8.16019L22.5067 13.1602L24.9467 10.7202Z" fill="var(--wp--preset--color--secondary)"></path>
          </svg>
        </div>
      </div>
      <p style={{ marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
        <a href="index.html">Apply</a>
      </p>
    </div>
  );
};