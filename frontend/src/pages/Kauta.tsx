import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BreadcrumbCenter } from "../components/subcomponents/BreadcrumpCenter";
import { truncateText } from "../utils/utils.fucntions";
import { SocialShare } from "../components/subcomponents/Sharesocial";
import { routes } from "../utils/utils.routes";
import { ContactLink } from "../components/subcomponents/ContactComponent";
import { Hrseparator } from "../components/subcomponents/Hrseparator";
import { BreadcrumpComponent } from "../components/subcomponents/BreadcrumpCompont";
import hero from "../assets/images/hero-image.png";
import { APPOWNER } from "../utils/utils.constants";

export const Kauta = () => {
    const { center } = useParams<{ center: string }>();
    const [item, setItem] = useState<Center | null>(null);

    return (
        <>
            <BreadcrumpComponent
                imageCover={hero}
                title={`Ecole primaire Kauta`}
                subtitle={"L’Institut Metanoia est une école privée agréée de l’Université Libre des Pays de Grands Lacs. Il a vu le jour au mois de septembre 2001, sous l’initiative du Professeur Ordinaire Samuel Ngayohembako, ancien Recteur de l’ULPGL"}
            />

            <div className="row mt-5">
                <aside className="col-md-4 pe-md-5">
                    <SocialShare
                        post_name={"institut-metanoia"}
                    />

                    <div className="mt-5 pt-5">
                        <h2 className="h4 fw-bold mb-3">Voir aussi</h2>
                        <hr className="mb-3" />
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to={routes.METANOIA} className="text-decoration-none text-dark">Institut Metanoia</Link></li>
                            <li className="mb-2"><Link to={routes.KAUTA_MATERNEL} className="text-decoration-none text-dark">La Crèche</Link></li>
                        </ul>
                    </div>
                </aside>

                <main className="col-md-8">
                    <article className="entry-content">

                        {/* Profile */}
                        <h2 className="h4 fw-bold mb-3">Profil et Présentation et localisation de l’école</h2>
                        <div className="row">
                            <div className="col-6">
                                <iframe
                                    width="100%"
                                    height="526"
                                    src="https://www.youtube.com/embed/-Fro1Ru_tk0"
                                    title="EMP KAUTA"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen />
                            </div>
                            <div className="col-6">
                                <iframe
                                    width="100%"
                                    height="526"
                                    src="https://www.youtube.com/embed/nkUEXLFGQ8Q"
                                    title="EMP KAUTA"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen />
                            </div>
                        </div>
                        {/* <p>
                            L’Institut Metanoia est une école privée agréée de l’Université Libre des Pays des Grands Lacs.
                            Il a vu le jour en septembre 2001 grâce à l’initiative du
                            <b>Professeur Ordinaire Samuel Ngayohembako</b>, ancien Recteur de l’ULPGL.
                        </p>

                        <p>
                            Situé dans la ville de Goma, Commune de Goma, quartier Himbi, à proximité de l’hôtel Karibu,
                            l’établissement organise quatre sections :
                            <b>Commerciale et Administrative</b>,
                            <b>Chimie-Biologie</b>,
                            <b>Latin-Philosophie</b> et
                            <b>Pédagogie Générale</b>.
                            Il a été conçu comme une pépinière pour l’Université et comme école d’application
                            de la Faculté des Sciences de l’Éducation de l’ULPGL.
                        </p>

                        <p>
                            L’école compte aujourd’hui <b>1177 élèves</b>, dont <b>546 filles</b>, provenant de tous les quartiers de Goma
                            ainsi que du Rwanda (Gisenyi). Plusieurs d’entre eux sont enfants de fonctionnaires.
                        </p>

                        <p>
                            Institut Metanoia joue un rôle majeur dans la pacification de la région en favorisant une
                            cohabitation harmonieuse entre élèves issus de diverses communautés ethniques et sociales,
                            sans aucune forme de discrimination.
                        </p>

                        <p>
                            Pour atteindre pleinement son objectif d’offrir un enseignement de qualité,
                            l’école nécessite un appui supplémentaire venant soutenir les efforts déjà consentis par les parents.
                        </p>

                        <hr className="my-4" style={{ opacity: 0.1 }} />
                        <h2 className="h4 fw-bold mb-3">Evolution de l’école</h2>
                        <p>
                            À sa création, l’école a débuté avec quatre classes : trois de premières comptant
                            <b>88 élèves</b> et une classe de deuxième avec <b>37 élèves</b>.
                            Elles étaient encadrées par six enseignants, deux agents administratifs
                            (le Préfet et le Secrétaire) ainsi qu’un ouvrier.
                        </p>

                        <p>
                            Au fil des années, de nouvelles classes se sont ouvertes progressivement,
                            jusqu’à atteindre aujourd’hui <b>25 classes</b> réparties en cinq sections :
                            <b>Commerciale et Gestion</b>,
                            <b>Littéraire</b>,
                            <b>Pédagogie</b>,
                            <b>Scientifique</b> et
                            <b>Construction</b>, cette dernière encore en gestation et actuellement dans sa deuxième année.
                        </p>

                        <p>
                            La première promotion a présenté les examens d’État en <b>2006</b> avec
                            <b>33 candidats</b>, parmi lesquels <b>32 ont obtenu leur diplôme d’État</b>.
                        </p> */}

                        <hr className="my-4" style={{ opacity: 0.1 }} />
                        <h2 className="h4 fw-bold mb-3">Direction</h2>
                        <h6>MIHANDA Esther</h6>

                        <hr className="my-4" style={{ opacity: 0.1 }} />
                        <h2 className="h4 fw-bold mb-3">Contacts</h2>
                        <ul>
                            <li><ContactLink value={"0853125385"} /></li>
                        </ul>
                    </article>
                </main>
            </div>
            <Hrseparator />
        </>
    );
}