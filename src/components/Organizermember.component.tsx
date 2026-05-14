import React from 'react';
import { useData } from '../contexts/DataContext';
import { thisAcademicYear } from '../utils/utils.statiquedata';
import { Colors } from '../utils/utils.colors';
import { ProfileCard } from './subcomponents/ProfileCard';

export const Organizer: React.FC = () => {
    const { staffMembers } = useData();
    const members: StaffMember[] = staffMembers.filter(member => member.isOrganizer);

    return (
        <div className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
            <div className="wp-block-group is-layout-flow wp-block-group-is-layout-flow">

                {/* Header Section */}
                <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                    <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
                        <h2 className="wp-block-heading has-primary-color has-text-color has-max-48-font-size">
                            Gouvernance et comité de gestion {thisAcademicYear}
                        </h2>
                        <p className="has-tertiary-color has-text-color">
                            L’Université Libre des Pays des Grands Lacs est un établissement à caractère scientifique, culturel et professionnel privé et agréé par le Gouvernement congolais. Elle est régie par un conseil d’administration, un conseil de l'université, un conseil scientifique et un comité de gestion piloté par un Recteur. Établissement pluridisciplinaire, l’Université est par ailleurs organisée autour de 7 facultés. Elle est également dotée de services.
                        </p>
                    </div>
                    <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
                </div>

                <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>

                {/* Team Grid */}
                <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                    {members.map((member: StaffMember, index) => (
                        <ProfileCard
                            profile={member}
                            showDescription
                            key={index}
                        />
                    ))}
                </div>
            </div>

            <div style={{ height: '118px' }} aria-hidden="true" className="wp-block-spacer"></div>
        </div>
    );
};