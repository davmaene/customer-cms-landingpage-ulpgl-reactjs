import { NavItem } from "./NavItem";

export const TopNavigation: React.FC = () => {
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
                                <NavItem href="/portail/student" label="Pour étudiants" />
                                <NavItem href="/portail/teachers" label="Pour enseignants" />
                                <NavItem href="/others/library" label="Bibliothèque" />
                                <NavItem href="/portail/metanoia" label="Metanoia" />
                                <NavItem href="/portail/kauta" label="Kauta" />
                                <NavItem href="/portail/nursery" label="Crèche" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};