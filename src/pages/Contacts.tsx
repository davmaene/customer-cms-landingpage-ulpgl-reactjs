import { ContactSection } from "../components/Contactform.component";
import { StaffDirectory } from "../components/Staff.component";
import { BreadcrumpComponent } from "../components/subcomponents/BreadcrumpCompont";
import bigCover from '../assets/images/big-cover.jpg';

export const Contacts: React.FC = () => {
    return (
        <>
            <BreadcrumpComponent
                title="Nos contacts"
                subtitle="Si vous souhaitez plus d’informations sur l’un de nos programmes académiques ou si vous avez d’autres questions, préoccupations ou avez besoin d’une aide et de conseils d’ordre général, nous sommes heureux de vous aider. Veuillez utiliser la liste ci-dessous pour vous aider à trouver les coordonnées que vous recherchez. L’adresse physique de l’Université Libre des Pays des Grands Lacs pour le campus de Moïse, qui abrite notre administration centrale, se trouve à l’avenue du Lac, N°2 Quartier Himbi II (Campus Moïse), commune de Goma, Ville Goma, Province du Nord-kivu."
                imageCover={bigCover}
            />
            {/* Content */}

            <div className="is-layout-container">
                
                <ContactSection />

                <main className="wp-block-group alignfull site-content has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" id="map" style={{ "background": "linear-gradient(180deg,rgb(250,250,250) 72%,rgba(0,58,102,0) 72%)", "marginTop": 0, "paddingTop": "var(--wp--preset--spacing--x-large)", "paddingBottom": 0 }}>
                    <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ "flexBasis": "25%" }}></div>

                        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ "flexBasis": "50%" }}>
                            <h2 className="wp-block-heading has-text-align-center has-primary-color has-text-color has-max-36-font-size">Localisation et Accès</h2>
                            <p className="has-text-align-center has-tertiary-color has-text-color">La gestion de nos services administratifs et académiques se centralise au niveau de notre rectorat, situé dans le quartier Himbi II, sur l'Avenue du Lac. Nous mettons cet outil de géolocalisation à votre disposition pour vous offrir une meilleure lisibilité de notre implantation. Vous trouverez en temps réel la position de nos bureaux, ce qui facilite la planification de vos visites et la fluidité de vos échanges avec les différents départements de notre université</p>
                        </div>

                        <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ "flexBasis": "25%" }}></div>
                    </div>

                    <div style={{ "height": "60px" }} aria-hidden="true" className="wp-block-spacer"></div>

                    <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex" style={{ "borderRadius": "0px" }}>
                        <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ "borderStyle": "none", "borderWidth": "0px", "paddingTop": 0, "paddingRight": 0, "paddingBottom": "var(--wp--preset--spacing--medium)", "paddingLeft": 0 }}>
                            {/* <figure className="wp-block-image aligncenter size-large">
                            <img fetchPriority="high" decoding="async" width="1024" height="481" src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20481'%3E%3C/svg%3E" alt="" className="wp-image-6241" data-lazy-srcset="https://demo.wpzoom.com/edublock-pro/files/2023/11/map-1024x481.png 1024w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map-300x141.png 300w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map-768x361.png 768w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map-1536x722.png 1536w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map.png 2000w" data-lazy-sizes="(max-width: 1024px) 100vw, 1024px" data-lazy-src="https://demo.wpzoom.com/edublock-pro/files/2023/11/map-1024x481.png" />
                            <noscript>
                                <img fetchPriority="high" decoding="async" width="1024" height="481" src="https://demo.wpzoom.com/edublock-pro/files/2023/11/map-1024x481.png" alt="" className="wp-image-6241" srcSet="https://demo.wpzoom.com/edublock-pro/files/2023/11/map-1024x481.png 1024w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map-300x141.png 300w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map-768x361.png 768w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map-1536x722.png 1536w, https://demo.wpzoom.com/edublock-pro/files/2023/11/map.png 2000w" sizes="(max-width: 1024px) 100vw, 1024px" />
                            </noscript>
                        </figure> */}
                            <div className="map-container" style={{ marginTop: '40px', width: '100%', height: '400px' }}>
                               
                                <iframe
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/d/u/0/edit?mid=1t6p299ybpg6qHFJTBX0RaXb0Pn94PzM&usp=sharing"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Répertoire du personnel */}
                <StaffDirectory />
            </div>
        </>
    );
}