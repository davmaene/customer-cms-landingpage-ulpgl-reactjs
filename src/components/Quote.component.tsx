import React from 'react';
import quoteImg from '../assets/images/177A7438.jpg';
import { thisAcademicYear } from '../utils/utils.statiquedata';
import { APPNAME, APPOWNER } from '../utils/utils.constants';

export const QuoteSection: React.FC = () => {
    return (
        <main className="wp-block-group alignfull has-primary-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained" id="quote">
            <div style={{ height: '80px' }} aria-hidden="true" className="wp-block-spacer"></div>

            <div className="wp-block-columns are-vertically-aligned-center is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
                    <figure className="wp-block-image size-full has-custom-border">
                        <img decoding="async" alt="Year Topic" className="wp-image-6777" style={{ borderStyle: 'none', borderWidth: '0px', borderRadius: '10px' }} src={quoteImg} />
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
                        L'intelligence artificielle au service de l'excellence académique
                    </h3>

                    <div style={{ height: '30px' }} aria-hidden="true" className="wp-block-spacer"></div>

                    <p className="has-text-align-left has-lightgrey-color has-text-color has-small-font-size">
                        Thème de l'année {thisAcademicYear} à {APPNAME}
                    </p>

                    <div style={{ height: '30px' }} aria-hidden="true" className="wp-block-spacer"></div>

                    {/* <div className="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
                        <div className="wp-block-button wpz-alt-button">
                            <a className="wp-block-button__link wp-element-button">Learn more</a>
                        </div>
                    </div> */}
                </div>
            </div>

            <div style={{ height: '80px' }} aria-hidden="true" className="wp-block-spacer"></div>
        </main>
    );
};