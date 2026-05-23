import { History } from "../components/History.component";
import { Organizer } from "../components/Organizermember.component";
import { VisionValues } from "../components/Visionvalues.component";
import { APPNAME, APPOWNER } from "../utils/utils.constants";
import { keyFacts } from "../utils/utils.statiquedata";
import bigCover from '../assets/images/hero-image.png';

export const About: React.FC = () => {

    return (
        <main className="wp-block-group site-content is-layout-flow wp-block-group-is-layout-flow" style={{ marginTop: 0 }}>
            <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained">

                <section id="main-title" className="wp-block-group has-global-padding">
                    <div style={{ height: '60px' }} aria-hidden="true" />
                    <h1 className="wp-block-heading has-text-align-center has-primary-color has-max-60-font-size">
                        Tout savoir sur {APPOWNER}
                    </h1>
                    <p className="has-text-align-center has-header-footer-color">
                        Développer une approche d'enseignement scientifique et de la recherche répondant aux aspirations de la société, dans la Région des Grands Lacs.
                    </p>
                    <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer" />
                </section>
                {/* Keys facts about us */}
                <div
                    id="key-facts"
                    className="wp-block-group alignfull has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained bg-danger"
                    style={{
                        background: 'linear-gradient(0deg, var(--wp--preset--color--primary) 81%, #fff 81%)',
                    }}
                >
                    <div className="wp-block-columns bg-danger">
                        <div className="wp-block-column">
                            {/* <figure className="wp-block-image alignwide size-large is-style-rounded desktop-only">
                                <img
                                    src={bigCover}
                                    alt="University campus"
                                    style={{ borderRadius: '10px' }}
                                />
                            </figure> */}

                            <div className="wp-block-spacer-mobile" style={{ height: '10px' }} aria-hidden="true" />

                            <div className="wp-block-columns">
                                <div className="wp-block-column">
                                    <h2 className="wp-block-heading has-white-color has-max-48-font-size" >
                                        Informations clés sur <br /> {APPNAME}
                                    </h2>
                                </div>
                                <div className="wp-block-column" style={{ flexBasis: '20%' }} />
                                <div className="wp-block-column">
                                    <p className="has-lightgrey-color">
                                        Nous aspirons à développer une approche d'enseignement scientifique et de la recherche répondant aux aspirations de la société, dans la Région des Grands Lacs.
                                    </p>
                                </div>
                            </div>
                            <div style={{ height: '60px' }} aria-hidden="true" />
                        </div>
                    </div>

                    {/* Grille des chiffres clés */}
                    {/* gridTemplateColumns: 'repeat(3, 1fr) */}
                    {/* style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} */}
                    <div className="wp-block-columns keys-grid">
                        {keyFacts.map((fact, index) => (
                            <div key={index} className="wp-block-column">
                                <div className="wp-block-group">
                                    <h2 className="wp-block-heading has-secondary-color">{fact.value}</h2>
                                    <p className="has-lightgrey-color">{fact.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ height: '80px' }} aria-hidden="true" />
                </div>
                {/* End keys Fact */}

                <div style={{ height: '80px' }} aria-hidden="true" className="wp-block-spacer"></div>

                {/* Histoire */}
                {/* <History /> */}

                {/* Vision and value */}
                {/* <VisionValues /> */}
                <div style={{ height: '80px' }} aria-hidden="true" className="wp-block-spacer"></div>

                {/* Organizer members */}
                <div className="is-layout-container">
                    <Organizer />
                </div>
            </div>
        </main>
    );
};