import React, { useState } from 'react';

import { LoadingComponent } from '../components/subcomponents/LoadingComponent';
import { useLocation, useParams } from 'react-router-dom';
import { LuChevronRight } from 'react-icons/lu';
import { useData } from '../contexts/DataContext';
import { randomNumber, truncateText } from '../utils/utils.fucntions';
import { SocialShare } from '../components/subcomponents/Sharesocial';
import { BreadcrumbCenter } from '../components/subcomponents/BreadcrumpCenter';
import { Hrseparator } from '../components/subcomponents/Hrseparator';
import { ContactLink } from '../components/subcomponents/ContactComponent';
import { ProfileCard } from '../components/subcomponents/ProfileCard';
import { BreadcrumbProfile } from '../components/subcomponents/BreadcrumpProfile';

const LuChevronRightIcon = LuChevronRight as any;

export const Profile: React.FC = () => {
    const { profile } = useParams<{ profile: string }>();
    const { staffMembers } = useData();
    const [item, setItem] = useState<StaffMember | null>(null);

    React.useEffect(() => {
        const foundCenter = staffMembers.find(c => c.slug === profile);
        setItem(foundCenter || null);
    }, [staffMembers, profile]);

    if (!item) {
        return <LoadingComponent />;
    }

    const { name, role, slug, uuid, description, email, extra, image, isOrganizer, phone, socialLinks } = item;

    return (
        <>
            <div className="container py-5">
                {/* Header de l'article */}
                <header className="mb-5">
                    <BreadcrumbProfile
                        category={name ?? ""}
                        profile_name={truncateText(name ?? "", 100)}
                    />
                    <h1 className="display-5 fw-bold">{name ?? ""}</h1>
                    <hr className="my-4" style={{ opacity: 0.1 }} />
                </header>

                {/* ----- */}

                <div className="row">
                    <aside className="col-md-4 pe-md-5">
                        <ProfileCard
                            profile={item}
                            showDescription={false}
                        />
                        {/* <SocialShare
                            post_name={slug ?? ""}
                        /> */}
                        {/* 
                        <div className="mt-5 pt-5">
                            <h2 className="h4 fw-bold mb-3">Autres centres de recherche</h2>
                            <hr className="mb-3" />
                            <ul className="list-unstyled">
                                {centers.filter(c => c.flug !== center).map((center, idx) => (
                                    <li key={idx} className="mb-2"><a href={center.href} className="text-decoration-none text-dark">{center.title}</a></li>
                                ))}
                            </ul>
                        </div> */}
                    </aside>

                    <main className="col-md-8">
                        <article className="entry-content">
                            <div
                                className="prose lead-"
                                dangerouslySetInnerHTML={{ __html: description ?? "" }}
                            />
                            {/* Bibliographie */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Bibliographie</h2>
                            <div
                                className="prose lead-"
                                dangerouslySetInnerHTML={{ __html: extra?.bibliography ?? "" }}
                            />
                            {/* Domaines de recherche */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Domaines de recherche</h2>
                            <ul>
                                {extra?.researchInterests?.map(etude => {
                                    return (<li>{etude}</li>);
                                })}
                            </ul>
                            {/* Publications */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Publications</h2>
                            <ul>
                                {extra?.publications?.map(partenaire => {
                                    return (<li>{partenaire}</li>);
                                })}
                            </ul>
                            {/* Contacts */}
                            <hr className="my-4" style={{ opacity: 0.1 }} />
                            <h2 className="h4 fw-bold mb-3">Contacts</h2>
                            <ul>
                                {email?.map(contact => {
                                    return (<li><ContactLink value={contact} /></li>);
                                })}
                            </ul>
                            <ul>
                                {phone?.map(contact => {
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