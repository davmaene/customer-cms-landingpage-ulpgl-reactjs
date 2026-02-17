import hero from '../assets/videos/hero-video.mp4';

export const HeroSection: React.FC = () => {
    return (
        <main className="wp-block-group alignfull site-content is-style-default is-layout-flow wp-container-core-group-is-layout-2bb4a3bc wp-block-group-is-layout-flow"
            style={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0 }}>

            <div className="wp-block-cover alignwide is-style-default"
                style={{ borderRadius: '0px', paddingTop: 'var(--wp--preset--spacing--small)', paddingRight: '0px', paddingBottom: 'var(--wp--preset--spacing--small)', paddingLeft: '0px' }}>

                <span aria-hidden="true"
                    className="wp-block-cover__background has-background-dim-100 has-background-dim wp-block-cover__gradient-background has-background-gradient has-black-primary-gradient-background"></span>

                <video className="wp-block-cover__video-background intrinsic-ignore" autoPlay muted loop playsInline
                    src={hero}
                    style={{ objectPosition: '35% 37%' }} data-object-fit="cover"
                    data-object-position="35% 37%"></video>

                <div className="wp-block-cover__inner-container is-layout-flow wp-block-cover-is-layout-flow">
                    <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>

                    <div className="wp-block-group is-style-default has-global-padding is-layout-constrained wp-container-core-group-is-layout-e73fcf31 wp-block-group-is-layout-constrained"
                        style={{ paddingRight: '5%', paddingLeft: '5%' }}>

                        <div style={{ height: '56px' }} aria-hidden="true" className="wp-block-spacer"></div>

                        <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                            <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '62%' }}>
                                <div className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
                                    <h1 className="wp-block-heading has-text-align-left has-white-color has-text-color has-max-60-font-size"
                                        style={{ lineHeight: '1.2' }}>
                                        Launching our Students into Bright Futures
                                    </h1>

                                    <p className="has-text-align-left">
                                        This is some dummy copy. You're not really<br />
                                        supposed to read this dummy copy.
                                    </p>

                                    <div className="wp-block-buttons is-content-justification-left is-layout-flex wp-container-core-buttons-is-layout-fc4fd283 wp-block-buttons-is-layout-flex">
                                        <div className="wp-block-button wpz-alt-button">
                                            <a className="wp-block-button__link wp-element-button">Apply now</a>
                                        </div>
                                        <div className="wp-block-button wpz-alt-button is-style-fill">
                                            <a className="wp-block-button__link has-foreground-color has-white-background-color has-text-color has-background has-link-color wp-element-button"
                                                style={{ paddingTop: '8px', paddingRight: '24px', paddingBottom: '8px', paddingLeft: '24px' }}>
                                                Schedule a Visit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '8vh' }} aria-hidden="true" className="wp-block-spacer"></div>
                </div>
            </div>
        </main>
    );
};