import React from 'react';

import { APPNAME, APPOWNER } from '../utils/utils.constants';
import { HeroSection } from '../components/Hero.component';
import { ArticleCard } from '../components/subcomponents/ArticleComponent';
import heroImage from '../assets/images/hero-image.png';
import { QuoteSection } from '../components/Quote.component';
import { randomNumber, shuffleArray, truncateText } from '../utils/utils.fucntions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import students from '../assets/images/177A7204.jpg';
import { ExploreCenters } from '../components/Centers.component';
import { DomainesSection } from '../components/Domaines.component';
import { useData } from '../contexts/DataContext';

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ArticlesSection />
      <QuoteSection />
      <ExploreCenters />
      <StudentsSection />
      <DomainesSection />
      <EnrollSection />
    </>
  );
};

const ArticlesSection: React.FC = () => {
  const { posts } = useData();

  return (
    <div id="articles" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-layout-container">
      <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">
        <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>

        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
            <h2 className="wp-block-heading has-primary-color has-text-color has-max-48-font-size">
              Articles et dernières informations
            </h2>
            <p className="has-tertiary-color has-text-color">
              Restez informé des avancées de nos projets et découvrez des analyses d'experts pour approfondir vos connaissances et optimiser votre quotidien académique.
            </p>
          </div>
          <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
        </div>

        <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>

        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
          {posts.slice(0, 3).map((post, idx) => {
            const key = randomNumber();

            return (
              <ArticleCard
                key={key}
                id={893}
                post_image={heroImage}
                post_title={post.post_title}
                post_excerpt={post.post_excerpt}
                post_author={post.post_author}
                post_date={post.post_date}
                post_content={post.post_content}
                post_category='Article'
                post_name={post.post_name}
              />
            )
          })}
        </div>

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
  const { activities } = useData();
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
    <div className="wp-block-column">
      <div className="wp-block-group" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {icon}
        <h5 className="wp-block-heading has-white-color">{title}</h5>
      </div>
    </div>
  );
};

const EnrollSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Votre inscription a été enregistrée avec succès");
  };

  return (
    <div id="dark-video" className="wp-block-group has-primary-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
      <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>

      <div className="wp-block-columns are-vertically-aligned-center is-layout-flex wp-block-columns-is-layout-flex">
        <div className="wp-block-column is-vertically-aligned-center" style={{ flexBasis: '60%' }}>
          <h2 className="wp-block-heading has-white-color has-max-60-font-size">Prêt à s'inscrire ?</h2>
          <p className="has-lightgrey-color has-text-color">
            Prenez le contrôle de votre avenir académique. Inscrivez-vous dès maintenant pour
            accéder à un enseignement scientifique de qualité,
            dans un environnement propice à l'innovation et à la recherche.
          </p>
          <p className="has-lightgrey-color has-text-color">
            Rejoignez une communauté académique d'excellence qui forme les leaders de demain
            dans la Région des Grands Lacs.
          </p>
        </div>

        <div className="wp-block-column is-vertically-aligned-center" style={{ flexBasis: '40%' }}>
          <div className="wp-block-group" style={{ padding: '30px', borderRadius: '10px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  className="form-control"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '5px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="form-control"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '5px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'var(--wp--preset--color--secondary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                S'inscrire maintenant →
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>
    </div>
  );
};
