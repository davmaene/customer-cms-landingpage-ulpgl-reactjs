import { APPDNS, APPNAME, APPCREATOR } from '../utils/utils.constants';
import { SocialLinks } from './subcomponents/SocialLinks';

const FooterColumn: React.FC<{ title: string; links: Array<{ href: string; label: string; current?: boolean }> }> = ({ title, links }) => {
  return (
    <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
      <h3 className="wp-block-heading has-secondary-color has-text-color"
        style={{marginBottom: 'var(--wp--preset--spacing--50)'}}>
        {title}
      </h3>
      
      <ul className="wp-block-page-list">
        {links.map((link, index) => (
          <li key={index} className={`wp-block-pages-list__item ${link.current ? 'current-menu-item menu-item-home' : ''}`}>
            <a className="wp-block-pages-list__item__link" href={link.href} {...(link.current && { 'aria-current': 'page' })}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer wp-block-template-part">
      <div className="wp-block-group alignfull is-style-default has-white-color has-header-footer-background-color has-text-color has-background has-link-color has-small-font-size has-global-padding is-layout-constrained wp-block-group-is-layout-constrained"
        style={{marginTop: '0px', paddingTop: '40px', paddingBottom: '40px'}}>
        
        <div className="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
            <h2 className="wp-block-heading has-white-color has-text-color has-max-36-font-size"
              style={{marginBottom: 'var(--wp--preset--spacing--50)'}}>
              {APPNAME}
            </h2>
            
            <p>
              This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.
            </p>
            
            <SocialLinks />
          </div>
          
          <FooterColumn 
            title="Explore"
            links={[
              { href: '#', label: 'About' },
              { href: '#', label: 'Academics' },
              { href: '#', label: 'Blog' },
              { href: '#', label: 'Campus' },
              { href: '#', label: 'Contact' },
              { href: '#', label: 'Events' },
              { href: '#', label: 'Homepage', current: true },
              { href: '#', label: 'Privacy Policy' },
            ]}
          />
          
          <FooterColumn 
            title="Resources"
            links={[
              { href: '#', label: 'About' },
              { href: '#', label: 'Academics' },
              { href: '#', label: 'Blog' },
              { href: '#', label: 'Campus' },
              { href: '#', label: 'Contact' },
              { href: '#', label: 'Events' },
              { href: '#', label: 'Homepage', current: true },
              { href: '#', label: 'Privacy Policy' },
            ]}
          />
          
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
            <h3 className="wp-block-heading has-secondary-color has-text-color"
              style={{marginBottom: 'var(--wp--preset--spacing--50)'}}>
              Newsletter
            </h3>
            <p>Inscrivez-vous avec votre adresse e-mail pour recevoir nos actualités hebdomadaires, et des notifications sur nos articles</p>
            
            <form action="#">
              <input type="text" placeholder="Email address" name="mail" required />
              <input type="submit" value="Subscribe" />
            </form>
          </div>
        </div>
        
        <hr className="wp-block-separator has-text-color has-alpha-channel-opacity has-background is-style-wide"
          style={{backgroundColor: '#ffffff24', color: '#ffffff24'}} />
        
        <div className="wp-block-group is-content-justification-space-between is-layout-flex wp-block-group-is-layout-flex">
          <p className="has-tertiary-color has-text-color">Copyright © {new Date().getFullYear()} {APPNAME}</p>
          
          <p className="has-tertiary-color has-text-color">
            Designed by <a href={APPDNS} target="_blank" rel="noreferrer noopener">{APPCREATOR}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};