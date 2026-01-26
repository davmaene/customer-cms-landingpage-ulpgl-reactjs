export const NavItem: React.FC<{ href: string; label: string; current?: boolean }> = ({ href, label, current = false }) => {
    return (
        <li className="has-small-font-size wp-block-navigation-item wp-block-navigation-link">
            <a className={`wp-block-navigation-item__content ${current ? 'current-menu-item' : ''}`} href={href} {...(current && { 'aria-current': 'page' })}>
                <span className="wp-block-navigation-item__label">{label}</span>
            </a>
        </li>
    );
};