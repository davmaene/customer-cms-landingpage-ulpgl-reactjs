import React from 'react';

import { APPNAME, APPOWNER } from '../utils/utils.constants';
import { HeroSection } from '../components/Hero.component';
import { ArticleCard } from '../components/subcomponents/ArticleComponent';
import heroImage from '../assets/images/hero-image.png';
import { QuoteSection } from '../components/Quote.component';
import { activities, centers, domainsData, feesData, posts } from '../utils/utils.statiquedata';
import { randomNumber, shuffleArray, truncateText } from '../utils/utils.fucntions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import students from '../assets/images/177A7204.jpg';
import { ExploreCenters } from '../components/Centers.component';
import { DomainesSection } from '../components/Domaines.component';

import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { Colors } from '../utils/utils.colors';
import { Paymenentinfos } from '../components/subcomponents/Paymenentinfos';
import { FaCircleInfo } from "react-icons/fa6";

const Info = FaCircleInfo as any

export const columns: ColumnsType<ItemFrais> = [
  {
    title: 'Promotion',
    dataIndex: 'promotion',
    key: 'promotion',
    fixed: 'left',
    width: 100,
    align: 'center',
  },
  {
    title: 'Faculté',
    dataIndex: 'faculte',
    key: 'faculte',
    fixed: 'left',
    width: 170,
    align: 'left',
  },
  {
    title: 'TOTAL',
    dataIndex: 'total',
    key: 'total',
    align: 'center',
    className: "bg-primary",
    width: 120,
    render: (total) => <strong style={{ color: Colors.whiteColor }}>{total} $</strong>,
  },
  {
    title: 'Frais Acad.',
    dataIndex: ['details_frais', 'frais_academiques'],
    key: 'frais_academiques',
    align: 'center',
    width: 100,
  },
  {
    title: 'Relevé',
    dataIndex: ['details_frais', 'releve'],
    key: 'releve',
    align: 'center',
    width: 100,
  },
  {
    title: 'Réinscription',
    dataIndex: ['details_frais', 'reinscription'],
    key: 'reinscription',
    align: 'center',
    width: 110,
    render: (val) => (val === null || val === 0 ? '-' : val),
  },
  {
    title: 'Carte',
    dataIndex: ['details_frais', 'carte'],
    key: 'carte',
    align: 'center',
    width: 100,
  },
  {
    title: 'Bibliothèque',
    dataIndex: ['details_frais', 'bibliotheque'],
    key: 'bibliotheque',
    align: 'center',
    width: 110,
  },
  {
    title: 'Coord. des étu.',
    dataIndex: ['details_frais', 'coordination'],
    key: 'coordination',
    align: 'center',
    width: 130,
  },
  {
    title: 'Diplôme',
    dataIndex: ['details_frais', 'diplome'],
    key: 'diplome',
    align: 'center',
    width: 100,
    render: (val) => (val === 0 ? '-' : val),
  },
  {
    title: 'Construction',
    dataIndex: ['details_frais', 'construction'],
    key: 'construction',
    align: 'center',
    width: 120,
  },
  {
    title: 'Stage',
    dataIndex: ['details_frais', 'stage'],
    key: 'stage',
    align: 'center',
    width: 100,
    render: (val) => (val === 0 ? '-' : val),
  },
  {
    title: 'Jury',
    dataIndex: ['details_frais', 'jury'],
    key: 'jury',
    align: 'center',
    width: 100,
    render: (val) => (val === 0 ? '-' : val),
  },
  {
    title: '1ère Tranche',
    dataIndex: ['tranches', 'premiere'],
    key: 'premiere',
    align: 'center',
    width: 120,
  },
  {
    title: '2ème Tranche',
    dataIndex: ['tranches', 'deuxieme'],
    key: 'deuxieme',
    align: 'center',
    width: 120,
  },
  {
    title: '3ème Tranche',
    dataIndex: ['tranches', 'troisieme'],
    key: 'troisieme',
    align: 'center',
    width: 120,
  },
];

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      {/* <FeaturesSection /> */}
      <ArticlesSection />
      <QuoteSection />
      {/* Explore our centers */}
      <ExploreCenters />
      {/* <ProgramSection /> */}
      <FeesSection />
      <StudentsSection />
      {/* Explore domaines */}
      <DomainesSection />
      {/* <OpportunitiesSection /> */}
      {/* <LatestNewsSection /> */}
      {/* <StudyLinksSection /> */}
      {/* <TeacherSpotlightSection /> */}
      {/* <ResearchSection /> */}
      <EnrollSection />
    </>
  );
};

const ArticlesSection: React.FC = () => {
  const [items, setItems] = React.useState<any[]>([]);
  React.useEffect(() => {
    import("../utils/api").then(({ apiGet }) =>
      apiGet("/contents", { limit: 3 }).then((d) => setItems(d.rows || [])).catch(() => setItems([]))
    );
  }, []);

  return (
    <div id="articles" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-layout-container">
      <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
        <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>

        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <h2 className="wp-block-heading has-primary-color has-text-color has-max-48-font-size">
              Articles et dernières nouvelles
            </h2>
            <p className="has-tertiary-color has-text-color">
              Plongez au cœur de l'innovation et enrichissez vos connaissances grâce aux publications de notre communauté
            </p>
          </div>
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
        </div>

        <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>

        {items.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: 30 }}>Aucun article publié pour le moment.</p>
        ) : (
          <div data-testid="home-articles" className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f844935665 wp-block-columns-is-layout-flex">
            {items.slice(0, 3).map((post) => (
              <ArticleCard
                key={post.id}
                id={post.id}
                post_image={post.coverImage || heroImage}
                post_title={post.title}
                post_excerpt={post.excerpt || ''}
                post_author={post.author?.name || 'ULPGL'}
                post_date={post.publishedAt || post.createdAt}
                post_content={post.content || ''}
                post_category={post.category || (post.type === 'event' ? 'Événement' : post.type === 'activity' ? 'Activité' : 'Article')}
                post_name={post.slug}
              />
            ))}
          </div>
        )}

        <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>
      </div>
    </div>
  );
};

const FeesSection: React.FC = () => {
  return (
    <div id="fees" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-layout-container">
      <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">

        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <h2 className="wp-block-heading has-primary-color has-text-color has-max-48-font-size">
              Informations sur les frais académiques et les frais connexes | 2025 - 2026
            </h2>
            <p className="has-tertiary-color has-text-color">
              Consultez la grille officielle des frais académiques
            </p>
          </div>
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
        </div>

        <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>
        <div style={{ width: '100%', display: 'block' }}>
          <Table
            columns={columns}
            dataSource={feesData}
            pagination={false}
            bordered
            size="small"
            scroll={{ x: 1400 }} // Fixer une valeur numérique ici force l'activation stricte du mode responsive interne
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: Colors.primaryColor,
                      color: Colors.whiteColor,
                    }}
                  />
                ),
              },
            }}
          />
        </div>
        <div style={{ height: '20px' }} aria-hidden="true" className="wp-block-spacer"></div>
        <span style={{ marginTop: 20 }} className='mt-3'>
          <Info style={{ color: Colors.primaryColor, marginRight: 10 }} />
          Tous les frais sont à versés sur les comptes officiels de {APPNAME} soit payés dans les guichets au niveau du service de fincance situé dans le campus Moise dans le batiment de l'adminsitration central
        </span>
        <Paymenentinfos />
        <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>
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
  const activites = activities ? shuffleArray(activities).slice(0, 1) : [];

  return (
    <main
      className="wp-block-group alignfull site-content"
      id="big-img"
      style={{ margin: 0, padding: 0 }}
    >
      <div
        className="wp-block-cover"
        style={{
          position: 'relative',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          padding: '0 30px',
          overflow: 'hidden',
          backgroundImage: `url(${students})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <span
          aria-hidden="true"
          className="wp-block-cover__background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(0deg, var(--wp--preset--color--primary) 17%, rgba(0,58,102,0) 73%)',
            opacity: 0.9
          }}
        ></span>

        <div
          className="wp-block-cover__inner-container is-layout-flow"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            color: 'white'
          }}
        >
          <div style={{ height: '15vh' }} aria-hidden="true" className="wp-block-spacer"></div>

          <div className="wp-block-group is-layout-constrained">
            <div className="wp-block-columns is-layout-flex">
              <div className="wp-block-column" style={{ flexBasis: '50%' }}>
                <div className="wp-block-group">
                  <h3 className="wp-block-heading has-max-48-font-size text-white" style={{ marginBottom: '20px' }}>
                    Activités
                  </h3>

                  <p style={{ color: '#lightgrey', marginBottom: '30px', maxWidth: '500px' }}>
                    Au-delà des cours, l'{APPOWNER} met à la disposition des étudiants un tas d'activités culturelles et académiques pour enrichir votre parcours.
                  </p>

                  <div className="wp-block-buttons is-layout-flex">
                    <div className="wp-block-button wpz-alt-button">
                      {activites.map((activity, index) => (
                        <Link
                          key={index}
                          className="wp-block-button__link wp-element-button"
                          to={activity.link}
                        >
                          {activity.name}
                        </Link>
                      ))}
                    </div>
                    <div className="wp-block-button is-style-fill">
                      <Link
                        to="/evenements/alumni-spotlight"
                        className="wp-block-button__link"
                        style={{
                          padding: '12px 24px',
                          backgroundColor: 'white',
                          color: 'black',
                          borderRadius: '5px',
                          textDecoration: 'none'
                        }}
                      >
                        En savoir plus
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: '15vh' }} aria-hidden="true" className="wp-block-spacer"></div>
        </div>
      </div>
    </main>
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
  const notify = () => toast('les inscriptions sont fermées pour le moment, mais n\'hésitez pas à nous contacter pour plus d\'informations !');

  return (
    <div className="wp-block-group alignfull has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" style={{ marginTop: '0px' }}>
      <div style={{ marginTop: 0, marginBottom: 0, height: '120px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-group alignfull has-primary-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
        <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
          <div style={{ height: '151px' }} aria-hidden="true" className="wp-block-spacer"></div>

          <div className="wp-block-columns are-vertically-aligned-center is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
            <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '86%' }}>
              <h2 className="wp-block-heading has-text-align-left has-white-color has-text-color has-max-48-font-size">
                Prêt à franchir une nouvelle étape <br />dans votre parcours académique ?
              </h2>
            </div>

            <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '14%' }}>
              <div className="wp-block-buttons wpz-alt-button is-content-justification-space-between is-layout-flex wp-block-buttons-is-layout-flex">
                <div className="wp-block-button alignright wpz-alt-button">
                  <a className="wp-block-button__link wp-element-button" style={{ borderRadius: '4px' }} onClick={notify}>
                    Inscription
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


