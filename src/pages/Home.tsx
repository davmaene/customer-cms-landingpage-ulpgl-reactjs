import React from 'react';
import { Footer } from '../components/Footer.component';
import { Header } from '../components/Header.component';
import { APPNAME } from '../utils/utils.constants';
import { SkipToContent } from '../components/subcomponents/Skipbutton';
import { HeroSection } from '../components/Hero.component';
import { FeatureItem } from '../components/subcomponents/FeatureItem.component';
import { FeaturesSection } from '../components/Feature.component';

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <InstructionsSection />
      <QuoteSection />
      <ExploreSection />
      <ProgramSection />
      <StudentsSection />
      <CoursesSection />
      <OpportunitiesSection />
      <LatestNewsSection />
      {/* <StudyLinksSection /> */}
      {/* <TeacherSpotlightSection /> */}
      <ResearchSection />
      <EnrollSection />
    </>
  );
};

const InstructionsSection: React.FC = () => {
  return (
    <div id="instructions" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
      <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
        <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>

        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <h2 className="wp-block-heading has-primary-color has-text-color has-max-48-font-size">
              Instruction for students
            </h2>
            <p className="has-tertiary-color has-text-color">
              This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people.
            </p>
          </div>
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
        </div>

        <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>

        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <InstructionCard
            imageSrc=""
            title="Tempus urna et pharetra pharetra massa nisi massa ultricies"
            description="This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type."
            linkText="Learn more"
            linkHref="index.html"
          />

          <InstructionCard
            imageSrc=""
            title="Amet mattis vulputate enim nulla aliquet porttitor lacus luctus"
            description="This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type."
            linkText="Learn more"
            linkHref="index.html"
          />
        </div>

        <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>
      </div>
    </div>
  );
};

const InstructionCard: React.FC<{
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}> = ({ imageSrc, title, description, linkText, linkHref }) => {
  return (
    <div className="wp-block-column has-light-background-background-color has-background is-layout-flow wp-block-column-is-layout-flow"
      style={{ borderStyle: 'none', borderWidth: '0px', paddingTop: '0px', paddingRight: '0px', paddingBottom: '0px', paddingLeft: '0px' }}>

      <figure className="wp-block-image size-large has-custom-border">
        <img decoding="async" src={imageSrc} alt="" className="wp-image-5969" style={{ borderRadius: '10px' }} />
      </figure>

      <h4 className="wp-block-heading has-primary-color has-text-color has-large-font-size">{title}</h4>

      <p className="has-header-footer-color has-text-color">{description}</p>

      <p><a href={linkHref}>{linkText} →</a></p>
    </div>
  );
};

const QuoteSection: React.FC = () => {
  return (
    <main className="wp-block-group alignfull has-primary-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" id="quote">
      <div style={{ height: '80px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns are-vertically-aligned-center is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
        <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
          <figure className="wp-block-image size-full has-custom-border">
            <img decoding="async" alt="" className="wp-image-6777" style={{ borderStyle: 'none', borderWidth: '0px', borderRadius: '10px' }} />
          </figure>
        </div>

        <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50px' }}></div>

        <div className="wp-block-column is-vertically-aligned-center is-style-default is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
          <div className="wp-block-outermost-icon-block">
            <div className="icon-container" style={{ width: '66px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
              <svg width="72" height="48" viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M54.48 40H57.52L64 27.04V8H48V24H62.48L54.48 40ZM14.48 40H17.52L24 27.04V8H8V24H22.48L14.48 40Z" fill="var(--wp--preset--color--secondary)"></path>
                <path d="M62.48 48L72 28.96V0H40V32H49.52L41.52 48H62.48ZM48 24V8H64V27.04L57.52 40H54.48L62.48 24H48ZM1.52 48H22.48L32 28.96V0H0V32H9.52L1.52 48ZM8 24V8H24V27.04L17.52 40H14.48L22.48 24H8Z" fill="var(--wp--preset--color--secondary)"></path>
              </svg>
            </div>
          </div>

          <div style={{ height: '50px' }} aria-hidden="true" className="wp-block-spacer"></div>

          <h3 className="wp-block-heading has-text-align-left has-white-color has-text-color has-max-36-font-size">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </h3>

          <div style={{ height: '30px' }} aria-hidden="true" className="wp-block-spacer"></div>

          <p className="has-text-align-left has-lightgrey-color has-text-color has-small-font-size">
            This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.
          </p>

          <div style={{ height: '30px' }} aria-hidden="true" className="wp-block-spacer"></div>

          <div className="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
            <div className="wp-block-button wpz-alt-button">
              <a className="wp-block-button__link wp-element-button">Learn more</a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '80px' }} aria-hidden="true" className="wp-block-spacer"></div>
    </main>
  );
};

const ExploreSection: React.FC = () => {
  const exploreItems = [
    { title: 'Our history', image: 'history.png', href: 'index.html' },
    { title: 'Our campus', image: 'campus.png', href: 'index.html' },
    { title: 'Curriculum', image: 'Curriculum-1.png', href: 'index.html' },
    { title: 'Sports', image: 'sports.png', href: 'index.html' },
    { title: 'Alumni', image: 'alumni.png', href: 'index.html' },
    { title: 'Volunteers', image: 'teachers.png', href: 'index.html' },
    { title: 'Events', image: 'events.png', href: 'index.html' },
  ];

  return (
    <div id="explore" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
          <h2 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-max-48-font-size">
            Explore our university
          </h2>
          <p className="has-tertiary-color has-text-color">
            This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people.
          </p>
        </div>
        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
      </div>

      <div style={{ height: '46px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex" style={{ borderRadius: '0px' }}>
        {exploreItems.slice(0, 4).map((item, index) => (
          <ExploreCard key={index} {...item} />
        ))}
      </div>

      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex" style={{ borderRadius: '0px' }}>
        {exploreItems.slice(4).map((item, index) => (
          <ExploreCard key={index} {...item} />
        ))}
      </div>

      <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>
    </div>
  );
};

const ExploreCard: React.FC<{ title: string; image: string; href: string }> = ({ title, image, href }) => {
  return (
    <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow"
      style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>

      <div className="wp-block-cover has-custom-content-position is-position-bottom-left is-style-round-corners"
        style={{ paddingTop: 'var(--wp--preset--spacing--small)', paddingRight: 'var(--wp--preset--spacing--small)', paddingBottom: 'var(--wp--preset--spacing--small)', paddingLeft: 'var(--wp--preset--spacing--small)', minHeight: '270px', aspectRatio: 'unset' }}>

        <span aria-hidden="true"
          className="wp-block-cover__background has-background-dim-80 has-background-dim wp-block-cover__gradient-background has-background-gradient has-black-primary-gradient-background"></span>

        <img decoding="async" className="wp-block-cover__image-background" alt=""
          src={`https://wpzoom.s3.us-east-1.amazonaws.com/elementor/templates/assets/thumbs/edublock-pro/${image}`}
          data-object-fit="cover" />

        <div className="wp-block-cover__inner-container is-layout-flow wp-block-cover-is-layout-flow">
          <p style={{ marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
            <a href={href}><strong>{title} →</strong></a>
          </p>
        </div>
      </div>
    </div>
  );
};

const ProgramSection: React.FC = () => {
  return (
    <div id="img-right" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
      <div className="wp-block-columns are-vertically-aligned-top is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
        <div className="wp-block-column is-vertically-aligned-top is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '40%' }}>
          <h2 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-max-48-font-size">
            Find Your<br />Program
          </h2>

          <p className="has-header-footer-color has-text-color">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium.<br /><br />
            Sed enim ut sem viverra aliquet. Consectetur a erat nam at lectus urna duis. Malesuada nunc vel risus commodo viverra maecenas.
          </p>

          <div style={{ height: '40px' }} aria-hidden="true" className="wp-block-spacer"></div>

          <p style={{ marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
            <a href="index.html">Learn more →</a>
          </p>
        </div>

        <div className="wp-block-column is-vertically-aligned-top is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '7%' }}></div>

        <div className="wp-block-column is-vertically-aligned-top is-style-round-corners has-background is-layout-flow wp-block-column-is-layout-flow"
          style={{ background: 'linear-gradient(0deg,var(--wp--preset--color--primary) 72%,rgb(255,255,255) 72%)', flexBasis: '50%' }}>

          <figure className="wp-block-image aligncenter size-large is-resized has-custom-border is-style-default">
            <img decoding="async" alt="" className="wp-image-5974"
              style={{ borderRadius: '10px', width: '509px', height: '382px' }} />
          </figure>

          <div style={{ height: '20px' }} aria-hidden="true" className="wp-block-spacer"></div>
        </div>
      </div>

      <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>
    </div>
  );
};

const StudentsSection: React.FC = () => {
  return (
    <main className="wp-block-group alignfull site-content is-layout-flow wp-container-core-group-is-layout-2bb4a3bc wp-block-group-is-layout-flow"
      id="big-img" style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>

      <div className="wp-block-cover" style={{ paddingTop: '0px', paddingRight: '30px', paddingBottom: '0px', paddingLeft: '30px' }}>

        <span aria-hidden="true"
          className="wp-block-cover__background has-background-dim-90 has-background-dim wp-block-cover__gradient-background has-background-gradient"
          style={{ background: 'linear-gradient(0deg,var(--wp--preset--color--primary) 17%,rgba(0,58,102,0) 73%)' }}></span>

        <img decoding="async" className="wp-block-cover__image-background wp-image-6765" alt=""
          src="https://wpzoom.s3.us-east-1.amazonaws.com/elementor/templates/assets/thumbs/edublock-pro/pexels-keira-burton-6147276.jpg"
          data-object-fit="cover" />

        <div className="wp-block-cover__inner-container is-layout-flow wp-block-cover-is-layout-flow">
          <div style={{ height: '15vh' }} aria-hidden="true" className="wp-block-spacer"></div>

          <div className="wp-block-group is-style-default has-global-padding is-layout-constrained wp-container-core-group-is-layout-4383d167 wp-block-group-is-layout-constrained">
            <div style={{ height: '80px' }} aria-hidden="true" className="wp-block-spacer"></div>

            <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
              <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
                <div className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
                  <h3 className="wp-block-heading has-text-align-left has-white-color has-text-color has-max-48-font-size">
                    Meet our Students
                  </h3>

                  <p className="has-text-align-left has-lightgrey-color has-text-color">
                    This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people.
                  </p>

                  <div className="wp-block-buttons is-content-justification-left is-layout-flex wp-container-core-buttons-is-layout-fc4fd283 wp-block-buttons-is-layout-flex">
                    <div className="wp-block-button wpz-alt-button">
                      <a className="wp-block-button__link wp-element-button">Alumni Spotlight</a>
                    </div>
                    <div className="wp-block-button is-style-fill">
                      <a className="wp-block-button__link has-foreground-color has-white-background-color has-text-color has-background has-link-color wp-element-button"
                        style={{ paddingTop: '8px', paddingRight: '24px', paddingBottom: '8px', paddingLeft: '24px' }}>
                        Read Stories
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '10vh' }} aria-hidden="true" className="wp-block-spacer"></div>
        </div>
      </div>
    </main>
  );
};

const CourseItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  links: Array<{ text: string; href: string }>;
}> = ({ icon, title, links }) => {
  return (
    <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow"
      style={{ borderStyle: 'none', borderWidth: '0px', paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>

      <div className="wp-block-group has-border-color has-lightgrey-border-color has-global-padding is-layout-constrained wp-container-core-group-is-layout-dbf27b9b wp-block-group-is-layout-constrained"
        style={{ borderWidth: '1px', borderRadius: '20px', paddingTop: 'var(--wp--preset--spacing--small)', paddingRight: 'var(--wp--preset--spacing--small)', paddingBottom: 'var(--wp--preset--spacing--small)', paddingLeft: 'var(--wp--preset--spacing--small)' }}>

        <div className="wp-block-columns are-vertically-aligned-center is-not-stacked-on-mobile is-layout-flex wp-container-core-columns-is-layout-d7d455e7 wp-block-columns-is-layout-flex"
          style={{ borderStyle: 'none', borderWidth: '0px', borderRadius: '0px', paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>

          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '36px' }}>
            {icon}
          </div>

          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '100%' }}>
            <h4 className="wp-block-heading has-primary-color has-text-color has-large-font-size">{title}</h4>
          </div>
        </div>

        {links.map((link, index) => (
          <React.Fragment key={index}>
            <CourseLink text={link.text} href={link.href} />
            {index < links.length - 1 && (
              <hr className="wp-block-separator has-text-color has-lightgrey-color has-alpha-channel-opacity has-lightgrey-background-color has-background is-style-wide" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const CourseLink: React.FC<{ text: string; href: string }> = ({ text, href }) => {
  return (
    <div className="wp-block-columns alignwide are-vertically-aligned-center is-not-stacked-on-mobile is-layout-flex wp-container-core-columns-is-layout-d7d455e7 wp-block-columns-is-layout-flex"
      style={{ borderStyle: 'none', borderWidth: '0px', borderRadius: '0px', paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>

      <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '95%' }}>
        <p className="has-header-footer-color has-text-color has-link-color">
          <a href={href}>{text}</a>
        </p>
      </div>

      <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '5%' }}>
        <div className="wp-block-outermost-icon-block items-justified-right">
          <div className="icon-container" style={{ width: '16px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.70998 12.7082L11.71 7.70823C11.801 7.61313 11.8724 7.50098 11.92 7.37823C12.02 7.13477 12.02 6.86169 11.92 6.61823C11.8724 6.49548 11.801 6.38334 11.71 6.28823L6.70998 1.28823C6.61674 1.19499 6.50605 1.12103 6.38423 1.07057C6.26241 1.02011 6.13184 0.99414 5.99998 0.99414C5.73368 0.99414 5.47828 1.09993 5.28998 1.28823C5.10168 1.47654 4.99589 1.73193 4.99589 1.99823C4.99589 2.26453 5.10168 2.51993 5.28998 2.70823L8.58998 5.99823L0.999982 5.99823C0.734765 5.99823 0.48041 6.10359 0.292874 6.29113C0.105338 6.47866 -1.83707e-05 6.73302 -1.83823e-05 6.99823C-1.83939e-05 7.26345 0.105338 7.5178 0.292874 7.70534C0.48041 7.89287 0.734765 7.99823 0.999982 7.99823L8.58998 7.99823L5.28998 11.2882C5.19625 11.3812 5.12186 11.4918 5.07109 11.6137C5.02032 11.7355 4.99418 11.8662 4.99418 11.9982C4.99418 12.1302 5.02032 12.2609 5.07109 12.3828C5.12186 12.5047 5.19625 12.6153 5.28998 12.7082C5.38294 12.802 5.49355 12.8764 5.6154 12.9271C5.73726 12.9779 5.86797 13.004 5.99998 13.004C6.13199 13.004 6.2627 12.9779 6.38456 12.9271C6.50642 12.8764 6.61702 12.802 6.70998 12.7082Z" fill="var(--wp--preset--color--secondary)"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesSection: React.FC = () => {
  const engineeringIcon = (
    <div className="wp-block-outermost-icon-block">
      <div className="icon-container" style={{ width: '36px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M3.31433 5.4849H9.94302V12.1136H3.31433V5.4849ZM19.8861 22.0566H26.5147V28.6853H19.8861V22.0566ZM3.31433 22.0566H9.94302V28.6853H3.31433V22.0566ZM22.637 4.68945L17.9472 9.36268L22.637 14.0525L27.3268 9.36268L22.637 4.68945Z" fill="var(--wp--preset--color--secondary)"></path>
          <path d="M22.637 0L13.2574 9.36302L22.637 18.7426L32.0166 9.36302L22.637 0ZM17.9472 9.36302L22.637 4.67323L27.3268 9.36302L22.637 14.0528L17.9472 9.36302ZM0 2.1709V15.4283H13.2574V2.1709H0ZM9.94304 12.1139H3.31434V5.48524H9.94304V12.1139ZM0 32H13.2574V18.7426H0V32ZM3.31434 22.057H9.94304V28.6857H3.31434V22.057ZM16.5717 18.7426V32H29.8291V18.7426H16.5717ZM26.5148 28.6857H19.8861V22.057H26.5148V28.6857Z" fill="var(--wp--preset--color--secondary)"></path>
        </svg>
      </div>
    </div>
  );

  const economicsIcon = (
    <div className="wp-block-outermost-icon-block">
      <div className="icon-container" style={{ width: '36px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
        <svg width="27" height="32" viewBox="0 0 27 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.2727 0H8.71273C7.11273 0 5.81818 1.30909 5.81818 2.90909H20.3636C21.9636 2.90909 23.2727 4.21818 23.2727 5.81818V24.7273L26.1818 26.1818V2.90909C26.1818 1.30909 24.8727 0 23.2727 0ZM17.4545 5.81818H2.90909C1.30909 5.81818 0 7.12727 0 8.72727V32L10.1818 27.6364L20.3636 32V8.72727C20.3636 7.12727 19.0545 5.81818 17.4545 5.81818ZM17.4545 27.5927L11.3309 24.96L10.1818 24.4655L9.03273 24.96L2.90909 27.5927V8.72727H17.4545V27.5927Z" fill="var(--wp--preset--color--secondary)"></path>
          <path opacity="0.3" d="M2.90912 27.592L10.1818 24.4647L17.4546 27.592V8.72656H2.90912V27.592Z" fill="var(--wp--preset--color--secondary)"></path>
        </svg>
      </div>
    </div>
  );

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

  const courseLinks = [
    { text: 'Non arcu risus quis varius', href: 'index.html' },
    { text: 'Velit scelerisque in dictum', href: 'index.html' },
    { text: 'Amet mattis vulputate enim', href: 'index.html' },
    { text: 'Turpis egestas sed tempus urna', href: 'index.html' },
    { text: 'Interdum posuere lorem ipsum', href: 'index.html' },
  ];

  return (
    <div id="links-3col" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
      <div style={{ marginTop: 0, marginBottom: 0, height: '120px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
          <h2 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-max-48-font-size">
            Choose a Course
          </h2>
          <p className="has-tertiary-color has-text-color">
            This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people.
          </p>
        </div>
        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
      </div>

      <div style={{ height: '46px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex" style={{ borderRadius: '0px' }}>
        <CourseItem icon={engineeringIcon} title="Engineering" links={courseLinks} />
        <CourseItem icon={economicsIcon} title="Economics" links={courseLinks} />
        <CourseItem icon={educationIcon} title="Education" links={courseLinks} />
      </div>

      <div className="wp-block-group alignfull has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" style={{ marginTop: '0px' }}>
        <div style={{ marginTop: 0, marginBottom: 0, height: '120px' }} aria-hidden="true" className="wp-block-spacer"></div>
      </div>
    </div>
  );
};

const OpportunityItem: React.FC<{
  icon: React.ReactNode;
  title: string;
}> = ({ icon, title }) => {
  return (
    <div className="wp-block-column is-vertically-aligned-center is-style-round-corners has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow"
      style={{ paddingTop: '80px', paddingRight: 'var(--wp--preset--spacing--medium)', paddingBottom: '80px', paddingLeft: 'var(--wp--preset--spacing--medium)' }}>
      {icon}
      <h4 className="wp-block-heading has-text-align-center has-primary-color has-text-color has-large-font-size">
        {title}
      </h4>
    </div>
  );
};

const OpportunitiesSection: React.FC = () => {
  const admissionsIcon = (
    <div className="wp-block-outermost-icon-block items-justified-center">
      <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
        <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M6.62866 10.9698H19.886V24.2272H6.62866V10.9698ZM39.7721 44.1132H53.0295V57.3706H39.7721V44.1132ZM6.62866 44.1132H19.886V57.3706H6.62866V44.1132ZM45.2739 9.37891L35.8943 18.7254L45.2739 28.105L54.6535 18.7254L45.2739 9.37891Z" fill="var(--wp--preset--color--secondary)"></path>
          <path d="M45.274 0L26.5148 18.726L45.274 37.4852L64.0331 18.726L45.274 0ZM35.8944 18.726L45.274 9.34645L54.6535 18.726L45.274 28.1056L35.8944 18.726ZM0 4.34179V30.8565H26.5148V4.34179H0ZM19.8861 24.2279H6.62869V10.9705H19.8861V24.2279ZM0 64H26.5148V37.4852H0V64ZM6.62869 44.1139H19.8861V57.3713H6.62869V44.1139ZM33.1434 37.4852V64H59.6582V37.4852H33.1434ZM53.0295 57.3713H39.7721V44.1139H53.0295V57.3713Z" fill="var(--wp--preset--color--secondary)"></path>
        </svg>
      </div>
    </div>
  );

  const updatesIcon = (
    <div className="wp-block-outermost-icon-block items-justified-center">
      <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
        <svg width="53" height="64" viewBox="0 0 53 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M46.5455 0H17.4255C14.2255 0 11.6364 2.61818 11.6364 5.81818H40.7273C43.9273 5.81818 46.5455 8.43636 46.5455 11.6364V49.4545L52.3636 52.3636V5.81818C52.3636 2.61818 49.7455 0 46.5455 0ZM34.9091 11.6364H5.81818C2.61818 11.6364 0 14.2545 0 17.4545V64L20.3636 55.2727L40.7273 64V17.4545C40.7273 14.2545 38.1091 11.6364 34.9091 11.6364ZM34.9091 55.1855L22.6618 49.92L20.3636 48.9309L18.0655 49.92L5.81818 55.1855V17.4545H34.9091V55.1855Z" fill="var(--wp--preset--color--secondary)"></path>
          <path opacity="0.3" d="M5.81812 55.184L20.3636 48.9295L34.909 55.184V17.4531H5.81812V55.184Z" fill="var(--wp--preset--color--secondary)"></path>
        </svg>
      </div>
    </div>
  );

  const curriculumIcon = (
    <div className="wp-block-outermost-icon-block items-justified-center">
      <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
        <svg width="64" height="57" viewBox="0 0 64 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M5.81836 18.0655V46.8945C9.13472 45.7018 12.5384 45.0909 16.0002 45.0909C19.462 45.0909 22.8656 45.7018 26.182 46.8945V18.0945C22.9529 16.7273 19.4911 16 16.0002 16C12.4511 16 9.04745 16.6982 5.81836 18.0655Z" fill="var(--wp--preset--color--secondary)"></path>
          <path d="M52.3638 0L37.8184 14.5455V42.1818L52.3638 29.0909V0Z" fill="var(--wp--preset--color--secondary)"></path>
          <path d="M62.4582 13.6745C61.0909 12.9763 59.6655 12.3945 58.1818 11.9V46.8963C54.8655 45.7036 51.4618 45.0927 48 45.0927C42.4727 45.0927 37.0036 46.6636 32 49.689V14.489C27.2873 11.7836 21.8473 10.1836 16 10.1836C10.7927 10.1836 5.87636 11.4636 1.54182 13.6745C0.581818 14.14 0 15.1581 0 16.2345V51.3763C0 53.0636 1.36727 54.2563 2.90909 54.2563C3.37455 54.2563 3.84 54.14 4.30545 53.9072C7.82545 52.0745 11.7818 50.9109 16 50.9109C22.0218 50.9109 27.5782 53.2963 32 56.729C36.4218 53.2963 41.9782 50.9109 48 50.9109C52.2182 50.9109 56.1745 52.0745 59.6945 53.9363C60.16 54.169 60.6255 54.2854 61.0909 54.2854C62.6036 54.2854 64 53.0927 64 51.4054V16.2345C64 15.1581 63.4182 14.14 62.4582 13.6745ZM26.1818 46.8963C22.8655 45.7036 19.4618 45.0927 16 45.0927C12.5382 45.0927 9.13455 45.7036 5.81818 46.8963V18.0672C9.04727 16.7 12.4509 16.0018 16 16.0018C19.4909 16.0018 22.9527 16.729 26.1818 18.0963V46.8963Z" fill="var(--wp--preset--color--secondary)"></path>
        </svg>
      </div>
    </div>
  );

  const calendarIcon = (
    <div className="wp-block-outermost-icon-block items-justified-center">
      <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
        <svg width="58" height="64" viewBox="0 0 58 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M6.40002 12.8008H51.2V19.2008H6.40002V12.8008Z" fill="var(--wp--preset--color--secondary)"></path>
          <path d="M51.2 6.4H48V0H41.6V6.4H16V0H9.6V6.4H6.4C2.848 6.4 0.032 9.28 0.032 12.8L0 57.6C0 59.2974 0.674283 60.9253 1.87452 62.1255C3.07475 63.3257 4.70261 64 6.4 64H51.2C54.72 64 57.6 61.12 57.6 57.6V12.8C57.6 9.28 54.72 6.4 51.2 6.4ZM51.2 57.6H6.4V25.6H51.2V57.6ZM51.2 19.2H6.4V12.8H51.2V19.2ZM19.2 38.4H12.8V32H19.2V38.4ZM32 38.4H25.6V32H32V38.4ZM44.8 38.4H38.4V32H44.8V38.4ZM19.2 51.2H12.8V44.8H19.2V51.2ZM32 51.2H25.6V44.8H32V51.2ZM44.8 51.2H38.4V44.8H44.8V51.2Z" fill="var(--wp--preset--color--secondary)"></path>
        </svg>
      </div>
    </div>
  );

  const opportunities = [
    { icon: admissionsIcon, title: 'Admissions' },
    { icon: updatesIcon, title: 'Updates' },
    { icon: curriculumIcon, title: 'Curriculum' },
    { icon: calendarIcon, title: 'Calendar' },
  ];

  return (
    <main className="wp-block-group alignfull site-content has-primary-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" id="links-4col" style={{ marginTop: 0, paddingTop: '80px', paddingBottom: '80px' }}>
      <h3 className="wp-block-heading has-text-align-center has-white-color has-text-color">
        Educational Opportunities
      </h3>

      <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex" style={{ borderRadius: '0px' }}>
        {opportunities.map((item, index) => (
          <OpportunityItem key={index} {...item} />
        ))}
      </div>

      <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
        <div className="wp-block-column is-vertically-aligned-center is-style-round-corners has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow"
          style={{ borderStyle: 'none', borderWidth: '0px', paddingTop: '80px', paddingRight: 'var(--wp--preset--spacing--medium)', paddingBottom: '80px', paddingLeft: 'var(--wp--preset--spacing--medium)' }}>

          <div className="wp-block-outermost-icon-block items-justified-center">
            <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
              <svg width="64" height="57" viewBox="0 0 64 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M32.2133 21.4062L7.11108 46.5085V49.7796H10.3822L35.4844 24.6774L32.2133 21.4062Z" fill="var(--wp--preset--color--secondary)"></path>
                <path d="M42.6667 42.668L28.4444 56.8903H64V42.668H42.6667ZM32.2133 11.3436L0 43.5569V56.8903H13.3333L45.5467 24.6769L32.2133 11.3436ZM10.3822 49.7791H7.11111V46.508L32.2133 21.4058L35.4844 24.6769L10.3822 49.7791ZM55.8578 14.3658C56.1874 14.0369 56.4489 13.6462 56.6273 13.216C56.8057 12.7859 56.8976 12.3248 56.8976 11.8591C56.8976 11.3935 56.8057 10.9324 56.6273 10.5023C56.4489 10.0721 56.1874 9.68141 55.8578 9.35248L47.5378 1.03247C46.8711 0.37111 45.9702 0 45.0311 0C44.0921 0 43.1911 0.37111 42.5244 1.03247L36.0178 7.53914L49.3511 20.8725L55.8578 14.3658Z" fill="var(--wp--preset--color--secondary)"></path>
              </svg>
            </div>
          </div>

          <h4 className="wp-block-heading has-text-align-center has-primary-color has-text-color has-large-font-size">
            How to Apply
          </h4>
        </div>

        <div className="wp-block-column is-vertically-aligned-center is-style-round-corners has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow"
          style={{ paddingTop: '80px', paddingRight: 'var(--wp--preset--spacing--medium)', paddingBottom: '80px', paddingLeft: 'var(--wp--preset--spacing--medium)' }}>

          <div className="wp-block-outermost-icon-block items-justified-center">
            <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
              <svg width="64" height="58" viewBox="0 0 64 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M64 0L58.656 5.344L53.344 0L48 5.344L42.656 0L37.344 5.344L32 0L26.656 5.344L21.344 0L16 5.344L10.656 0L5.344 5.344L0 0V51.2C0 54.72 2.88 57.6 6.4 57.6H57.6C61.12 57.6 64 54.72 64 51.2V0ZM28.8 51.2H6.4V32H28.8V51.2ZM57.6 51.2H35.2V44.8H57.6V51.2ZM57.6 38.4H35.2V32H57.6V38.4ZM57.6 25.6H6.4V16H57.6V25.6Z" fill="var(--wp--preset--color--secondary)"></path>
              </svg>
            </div>
          </div>

          <h4 className="wp-block-heading has-text-align-center has-primary-color has-text-color has-large-font-size">
            Academics
          </h4>
        </div>

        <div className="wp-block-column is-vertically-aligned-center is-style-round-corners has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow"
          style={{ paddingTop: '80px', paddingRight: 'var(--wp--preset--spacing--medium)', paddingBottom: '80px', paddingLeft: 'var(--wp--preset--spacing--medium)' }}>

          <div className="wp-block-outermost-icon-block items-justified-center">
            <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
              <svg width="61" height="64" viewBox="0 0 61 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.4211 30.3158V10.1053L30.3158 0L20.2105 10.1053V16.8421H0V64H60.6316V30.3158H40.4211ZM13.4737 57.2632H6.73684V50.5263H13.4737V57.2632ZM13.4737 43.7895H6.73684V37.0526H13.4737V43.7895ZM13.4737 30.3158H6.73684V23.5789H13.4737V30.3158ZM33.6842 57.2632H26.9474V50.5263H33.6842V57.2632ZM33.6842 43.7895H26.9474V37.0526H33.6842V43.7895ZM33.6842 30.3158H26.9474V23.5789H33.6842V30.3158ZM33.6842 16.8421H26.9474V10.1053H33.6842V16.8421ZM53.8947 57.2632H47.1579V50.5263H53.8947V57.2632ZM53.8947 43.7895H47.1579V37.0526H53.8947V43.7895Z" fill="var(--wp--preset--color--secondary)"></path>
              </svg>
            </div>
          </div>

          <h4 className="wp-block-heading has-text-align-center has-primary-color has-text-color has-large-font-size">
            Location
          </h4>
        </div>

        <div className="wp-block-column is-vertically-aligned-center is-style-round-corners has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow"
          style={{ paddingTop: '80px', paddingRight: 'var(--wp--preset--spacing--medium)', paddingBottom: '80px', paddingLeft: 'var(--wp--preset--spacing--medium)' }}>

          <div className="wp-block-outermost-icon-block items-justified-center">
            <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
              <svg width="58" height="64" viewBox="0 0 58 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.3" d="M6.40002 12.8008V57.6008H51.2V12.8008H6.40002ZM35.2 51.2008H12.8V44.8008H35.2V51.2008ZM44.8 38.4008H12.8V32.0008H44.8V38.4008ZM44.8 25.6008H12.8V19.2008H44.8V25.6008Z" fill="var(--wp--preset--color--secondary)"></path>
                <path d="M12.8 44.8H35.2V51.2H12.8V44.8ZM12.8 32H44.8V38.4H12.8V32ZM12.8 19.2H44.8V25.6H12.8V19.2ZM51.2 6.4H37.824C36.48 2.688 32.96 0 28.8 0C24.64 0 21.12 2.688 19.776 6.4H6.4C5.952 6.4 5.536 6.432 5.12 6.528C4.10084 6.74183 3.14893 7.20016 2.34621 7.86351C1.54349 8.52687 0.914023 9.37539 0.512 10.336C0.192 11.104 0 11.904 0 12.8V57.6C0 58.464 0.192 59.328 0.512 60.096C0.832 60.864 1.312 61.536 1.888 62.144C2.752 63.008 3.872 63.648 5.12 63.904C5.536 63.968 5.952 64 6.4 64H51.2C54.72 64 57.6 61.12 57.6 57.6V12.8C57.6 9.28 54.72 6.4 51.2 6.4ZM28.8 5.6C30.112 5.6 31.2 6.688 31.2 8C31.2 9.312 30.112 10.4 28.8 10.4C27.488 10.4 26.4 9.312 26.4 8C26.4 6.688 27.488 5.6 28.8 5.6ZM51.2 57.6H6.4V12.8H51.2V57.6Z" fill="var(--wp--preset--color--secondary)"></path>
              </svg>
            </div>
          </div>

          <h4 className="wp-block-heading has-text-align-center has-primary-color has-text-color has-large-font-size">
            Tuition &amp; Fees
          </h4>
        </div>
      </div>
    </main>
  );
};

const LatestNewsSection: React.FC = () => {
  const newsItems = [
    {
      title: 'Curabitur blandit tempus porttitor',
      href: '2024/12/16/curabitur-blandit-tempus-porttitor/index.html',
      category: 'Style',
      date: 'December 16, 2024',
      excerpt: 'This is some dummy copy. You\'re not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the […]'
    },
    {
      title: 'Style Guide',
      href: '2024/03/15/style-guide/index.html',
      category: 'General',
      date: 'March 15, 2024',
      excerpt: 'This is some dummy copy. You\'re not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the […]'
    },
    {
      title: 'Post with Mosaic Gallery',
      href: '2024/03/11/post-with-mosaic-gallery/index.html',
      category: 'Design',
      date: 'March 11, 2024',
      excerpt: 'This is some dummy copy. You\'re not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the […]'
    },
    {
      title: 'Post with YouTube Video',
      href: '2024/03/10/post-with-youtube-video/index.html',
      category: 'Video',
      date: 'March 10, 2024',
      excerpt: 'This is some dummy copy. You\'re not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the […]'
    },
  ];

  return (
    <div className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
      <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
        <div className="wp-block-column is-vertically-aligned-center is-style-pull-left is-layout-flow wp-block-column-is-layout-flow"
          style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, flexBasis: '50%' }}>

          <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '100px' }}></div>

            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '100%' }}>
              <h2 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-max-48-font-size">
                Teacher<br />Spotlight
              </h2>

              <p className="has-tertiary-color has-text-color">
                This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people.
              </p>
            </div>
          </div>

          <div className="wp-block-group is-style-round-corners has-primary-background-color has-background has-global-padding is-layout-constrained wp-container-core-group-is-layout-dbf27b9b wp-block-group-is-layout-constrained"
            style={{ borderRadius: '10px', paddingTop: 'var(--wp--preset--spacing--small)', paddingRight: 'var(--wp--preset--spacing--small)', paddingBottom: 'var(--wp--preset--spacing--small)', paddingLeft: 'var(--wp--preset--spacing--small)' }}>

            <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
              <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '48px' }}>
                <div className="wp-block-outermost-icon-block">
                  <div className="icon-container" style={{ width: '48px', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
                    <svg width="53" height="35" viewBox="0 0 53 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.3" d="M39.725 29.1673H41.9417L46.6667 19.7173V5.83398H35V17.5007H45.5584L39.725 29.1673ZM10.5584 29.1673H12.775L17.5 19.7173V5.83398H5.83337V17.5007H16.3917L10.5584 29.1673Z" fill="var(--wp--preset--color--secondary)"></path>
                      <path d="M45.5583 35L52.5 21.1167V0H29.1667V23.3333H36.1083L30.275 35H45.5583ZM35 17.5V5.83333H46.6667V19.7167L41.9417 29.1667H39.725L45.5583 17.5H35ZM1.10833 35H16.3917L23.3333 21.1167V0H0V23.3333H6.94167L1.10833 35ZM5.83333 17.5V5.83333H17.5V19.7167L12.775 29.1667H10.5583L16.3917 17.5H5.83333Z" fill="var(--wp--preset--color--secondary)"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
                <h4 className="wp-block-heading has-white-color has-text-color" style={{ lineHeight: '1.5' }}>
                  Dis parturient montes nascetur ridiculus. Vitae tortor condimentum lacinia quis vel eros. Sed odio morbi quis commodo odio aenean. Vulputate ut pharetra sit amet aliquam id diam maecenas.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>
    </div>
  );
};

const ResearchSection: React.FC = () => {
  return (
    <main className="wp-block-group alignfull site-content has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained"
      id="img-full-width"
      style={{ background: 'linear-gradient(180deg,var(--wp--preset--color--primary) 66%,rgb(255,255,255) 66%)', marginTop: 0 }}>

      <div className="wp-block-group is-style-default is-layout-flow wp-block-group-is-layout-flow">
        <div style={{ height: '95px' }} aria-hidden="true" className="wp-block-spacer"></div>

        <h3 className="wp-block-heading has-white-color has-text-color"
          style={{ fontSize: 'clamp(20px, 1.25rem + ((1vw - 3.2px) * 1.25), 32px)' }}>
          Research Centers
        </h3>

        <div className="wp-block-columns are-vertically-aligned-top is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-vertically-aligned-top is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <p className="has-lightgrey-color has-text-color">
              Cursus turpis massa tincidunt dui ut ornare. Facilisi cras fermentum odio eu feugiat pretium nibh. Gravida neque convallis a cras. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in.
            </p>
          </div>

          <div className="wp-block-column is-vertically-aligned-top is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <p className="has-lightgrey-color has-text-color">
              Dis parturient montes nascetur ridiculus. Vitae tortor condimentum lacinia quis vel eros. Sed odio morbi quis commodo odio aenean. Vulputate ut pharetra sit amet aliquam id diam maecenas.
            </p>
          </div>
        </div>

        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '100%' }}>
            <div style={{ height: '50px' }} aria-hidden="true" className="wp-block-spacer"></div>

            <figure className="wp-block-image aligncenter size-full has-custom-border">
              <img decoding="async" alt="" className="wp-image-6775" style={{ borderRadius: '10px' }}
                src="https://wpzoom.s3.us-east-1.amazonaws.com/elementor/templates/assets/thumbs/edublock-pro/pexels-tima-miroshnichenko-6549627.jpg" />
            </figure>
          </div>
        </div>

        <div className="wp-block-columns are-vertically-aligned-top is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-vertically-aligned-top is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <p className="has-header-footer-color has-text-color">
              Dis parturient montes nascetur ridiculus. Vitae tortor condimentum lacinia quis vel eros. Sed odio morbi quis commodo odio aenean. Vulputate ut pharetra sit amet aliquam id diam maecenas.
            </p>
          </div>

          <div className="wp-block-column is-vertically-aligned-top is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <p className="has-header-footer-color has-text-color">
              Tempus urna et pharetra pharetra massa massa ultricies. Sodales ut etiam sit amet nisl purus. Velit scelerisque in dictum non consectetur a erat.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

const EnrollSection: React.FC = () => {
  return (
    <div className="wp-block-group alignfull has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" style={{ marginTop: '0px' }}>
      <div style={{ marginTop: 0, marginBottom: 0, height: '120px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-group alignfull has-primary-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
        <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
          <div style={{ height: '151px' }} aria-hidden="true" className="wp-block-spacer"></div>

          <div className="wp-block-columns are-vertically-aligned-center is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
            <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '86%' }}>
              <h2 className="wp-block-heading has-text-align-left has-white-color has-text-color has-max-48-font-size">
                Ready to enroll in <br />our University?
              </h2>
            </div>

            <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '14%' }}>
              <div className="wp-block-buttons wpz-alt-button is-content-justification-space-between is-layout-flex wp-block-buttons-is-layout-flex">
                <div className="wp-block-button alignright wpz-alt-button">
                  <a className="wp-block-button__link wp-element-button" style={{ borderRadius: '4px' }}>
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '152px' }} aria-hidden="true" className="wp-block-spacer"></div>
        </div>
      </div>
    </div>
  );
};


