import React, { useEffect, useState } from 'react';

import { LoadingComponent } from '../components/subcomponents/LoadingComponent';
import { useParams } from 'react-router-dom';
import { randomNumber, truncateText } from '../utils/utils.fucntions';
import { SocialShare } from '../components/subcomponents/Sharesocial';
import { BreadcrumbCenter } from '../components/subcomponents/BreadcrumpCenter';
import { Hrseparator } from '../components/subcomponents/Hrseparator';
import { ContactLink } from '../components/subcomponents/ContactComponent';
import { ProfileCard } from '../components/subcomponents/ProfileCard';
import { apiGet } from '../utils/api';
import { NotFound } from './NotFound';

export const Center: React.FC = () => {
    const { center } = useParams<{ center: string }>();
    const [item, setItem] = useState<any>(undefined);
    const [otherCenters, setOtherCenters] = useState<any[]>([]);

    useEffect(() => {
        if (!center) return;
        apiGet(`/centers/slug/${center}`)
            .then((d) => setItem(d.item))
            .catch(() => setItem(null));
        apiGet(`/centers`)
            .then((d) => setOtherCenters((d.rows || []).filter((c: any) => c.slug !== center)))
            .catch(() => {});
    }, [center]);

    if (item === undefined) return <LoadingComponent />;
    if (item === null) return <NotFound />;

    const { title, description, domaineInterventions, images, contacts, etudesRealisees, partenaires, slug: flug, profile, direction } = item;

    return (
        <>
            <div className="container py-5">
                {/* Header de l'article */}
                <header className="mb-5">
                    <BreadcrumbCenter
                        category={title ?? ""}
                        post_title={truncateText(description ?? "", 50)}
                    />
                    <h1 className="display-5 fw-bold">{title ?? ""}</h1>
                    <hr className="my-4" style={{ opacity: 0.1 }} />
                </header>

                {/* ----- */}

                <div className="row">
                    <aside className="col-md-4 pe-md-5">
                        {direction?.image && (
                            <ProfileCard
                                profile={direction ?? {
                                    slug: "",
                                    name: "ULPGL",
                                    role: "Direction",
                                    uuid: randomNumber(10).toString()
                                }}
                                showDescription={false}
                            />
                        )}
                        <SocialShare
                            post_name={flug ?? ""}
                        />

                        <div className="mt-5 pt-5">
                            <h2 className="h4 fw-bold mb-3">Autres centres de recherche</h2>
                            <hr className="mb-3" />
                            <ul className="list-unstyled">
                                {otherCenters.map((c: any, idx: number) => (
                                    <li key={idx} className="mb-2"><a href={`/app/centres/${c.slug}`} className="text-decoration-none text-dark">{c.title}</a></li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <main className="col-md-8">
                        <article className="entry-content">
                            <div
                                className="prose lead-"
                                dangerouslySetInnerHTML={{ __html: description ?? "" }}
                            />
                            {images?.length && images.length > 0 ? (
                                <div className="row g-3 my-4">
                                    {images?.map((image: string, idx: number) => (
                                        <div className="col-6 col-md-4" key={idx}>
                                            <img src={image} className="img-fluid rounded" alt="Gallery" />
                                        </div>
                                    ))}
                                </div>
                            ) : <></>}
                            {/* Profile */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Profil</h2>
                            <div
                                className="prose lead-"
                                dangerouslySetInnerHTML={{ __html: profile ?? "" }}
                            />
                            {/* Domaines d'intervention */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Domaines d'intervention</h2>
                            <ul>
                                {(domaineInterventions || []).map((domaine: string) => {
                                    return (<li>{domaine}</li>);
                                })}
                            </ul>
                            {/* Etudes réalisées */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Etudes réalisées</h2>
                            <ul>
                                {etudesRealisees?.map((etude: string) => {
                                    return (<li>{etude}</li>);
                                })}
                            </ul>
                            {/* Partenaires */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Partenaires</h2>
                            <ul>
                                {partenaires?.map((partenaire: string) => {
                                    return (<li>{partenaire}</li>);
                                })}
                            </ul>
                            {/* Direction */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Direction</h2>
                            <h6>{direction?.name ?? ""}</h6>
                            <div
                                className="prose lead-"
                                dangerouslySetInnerHTML={{ __html: "<strong>Mot de la direction : </strong>".concat(direction?.description ?? "") }}
                            />
                            {/* Contacts */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Contacts du centre</h2>
                            <ul>
                                {contacts?.map((contact: string) => {
                                    return (<li><ContactLink value={contact} /></li>);
                                })}
                            </ul>
                        </article>
                    </main>
                </div>
                <Hrseparator />
            </div>
        </>
    );
}