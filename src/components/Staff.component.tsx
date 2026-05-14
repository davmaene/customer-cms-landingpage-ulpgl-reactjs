import React from 'react';
import { useData } from '../contexts/DataContext';
import { Colors } from '../utils/utils.colors';
import { FaEnvelope } from 'react-icons/fa';
import { GiPhone } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { routes } from '../utils/utils.routes';

const EnvelopeIcon = FaEnvelope as any;
const PhoneIcon = GiPhone as any;

export const StaffDirectory: React.FC = () => {
    const { staffMembers } = useData();

    return (
        <section id="other-contacts" className="wp-block-group has-global-padding" style={{ padding: '4rem 0' }}>
            <div className="wp-block-group">
                <div className="wp-block-columns">
                    <div className="wp-block-column" style={{ flexBasis: '50%' }}>
                        <h2 className="wp-block-heading has-primary-color has-max-48-font-size">
                            Notre Corps Professoral et Administratif
                        </h2>
                        <p className="has-tertiary-color">
                            Découvrez les experts et les professionnels dévoués qui font vivre l'excellence académique à l'ULPGL au quotidien.
                        </p>
                    </div>
                </div>

                <div style={{ height: '60px' }} aria-hidden="true" />

                <div
                    className="wp-block-columns staff-grid"
                // style={{
                //     display: 'grid',
                //     gridTemplateColumns: 'repeat(3, 1fr)',
                //     gap: '2rem',
                //     alignItems: 'stretch'
                // }}
                >
                    {[...staffMembers].map((person, pIdx) => (
                        <div
                            key={pIdx}
                            className="wp-block-column"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            <div key={person.name} style={{ flex: 1 }}>
                                <div className="wp-block-group">
                                    <Link to={ routes.PROFILE.concat("/").concat(person.slug)} > <h5 className="has-primary-color">{person.name}</h5></Link>
                                    <p className="has-tertiary-color" style={{ marginTop: '5px' }}>{person.role}</p>
                                    <p className="has-header-footer-color" style={{ marginTop: '20px' }}>
                                        {person.email?.map((email, idx) => (
                                            <React.Fragment key={idx}>
                                                <EnvelopeIcon color={Colors.redColor} style={{ marginRight: '5px' }} />
                                                {email}<br />
                                            </React.Fragment>
                                        ))}
                                        {person.phone?.map((phone, idx) => (
                                            <React.Fragment key={idx}>
                                                <PhoneIcon color={Colors.redColor} style={{ marginRight: '5px' }} />
                                                {phone}<br />
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                                <div style={{ height: '40px' }} />
                                <hr className="wp-block-separator is-style-wide" />
                                <div style={{ height: '40px' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
