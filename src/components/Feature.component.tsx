import { FeatureItem } from "./subcomponents/FeatureItem.component";

export const FeaturesSection: React.FC = () => {
    const registrationIcon = (
        <div className="wp-block-outermost-icon-block">
            <div className="icon-container" style={{ width: '75%', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
                <svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 23.9998L16 31.9998H36V23.9998H24ZM18.12 6.37979L0 24.4998V31.9998H7.5L25.62 13.8798L18.12 6.37979ZM5.84 27.9998H4V26.1598L18.12 12.0398L19.96 13.8798L5.84 27.9998ZM31.42 8.07979C31.6054 7.89476 31.7525 7.67499 31.8529 7.43304C31.9532 7.19109 32.0049 6.93173 32.0049 6.66979C32.0049 6.40785 31.9532 6.14849 31.8529 5.90654C31.7525 5.6646 31.6054 5.44482 31.42 5.25979L26.74 0.57979C26.365 0.207773 25.8582 -0.000976562 25.33 -0.000976562C24.8018 -0.000976562 24.295 0.207773 23.92 0.57979L20.26 4.23979L27.76 11.7398L31.42 8.07979Z" fill="var(--wp--preset--color--secondary)"></path>
                </svg>
            </div>
        </div>
    );

    const newsIcon = (
        <div className="wp-block-outermost-icon-block">
            <div className="icon-container" style={{ width: '75%', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
                <svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 0L36.66 3.34L33.34 0L30 3.34L26.66 0L23.34 3.34L20 0L16.66 3.34L13.34 0L10 3.34L6.66 0L3.34 3.34L0 0V32C0 34.2 1.8 36 4 36H36C38.2 36 40 34.2 40 32V0ZM18 32H4V20H18V32ZM36 32H22V28H36V32ZM36 24H22V20H36V24ZM36 16H4V10H36V16Z" fill="var(--wp--preset--color--secondary)"></path>
                </svg>
            </div>
        </div>
    );

    const discoverIcon = (
        <div className="wp-block-outermost-icon-block">
            <div className="icon-container" style={{ width: '75%', transform: 'rotate(0deg) scaleX(1) scaleY(1)' }}>
                <svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 18V6L18 0L12 6V10H0V38H36V18H24ZM8 34H4V30H8V34ZM8 26H4V22H8V26ZM8 18H4V14H8V18ZM20 34H16V30H20V34ZM20 26H16V22H20V26ZM20 18H16V14H20V18ZM20 10H16V6H20V10ZM32 34H28V30H32V34ZM32 26H28V22H32V26Z" fill="var(--wp--preset--color--secondary)"></path>
                </svg>
            </div>
        </div>
    );

    return (
        <div className="wp-block-group alignwide is-style-default has-primary-background-color has-background has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
            <div style={{ height: '5.5vh' }} aria-hidden="true" className="wp-block-spacer"></div>

            <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                <FeatureItem
                    icon={registrationIcon}
                    title="Registration"
                    description="Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus."
                    linkText="Apply now"
                    linkHref="index.html"
                />

                <div className="wp-block-column is-style-default is-layout-flow wp-block-column-is-layout-flow"
                    style={{ borderTopStyle: 'none', borderTopWidth: '0px', borderRightColor: '#6c6c77', borderRightWidth: '1px', borderBottomStyle: 'none', borderBottomWidth: '0px', paddingRight: '5%', paddingLeft: '2%' }}>

                    <div className="wp-block-columns are-vertically-aligned-center is-not-stacked-on-mobile is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                        <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '72px' }}>
                            {newsIcon}
                        </div>
                        <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow"
                            style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, flexBasis: '100%' }}>
                            <h4 className="wp-block-heading has-text-align-left has-white-color has-text-color">Latest news</h4>
                        </div>
                    </div>

                    <p className="has-lightgrey-color has-text-color">Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus.</p>

                    <div style={{ height: '50px' }} aria-hidden="true" className="wp-block-spacer"></div>

                    <p className="has-link-color has-small-font-size" style={{ marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
                        <a href="index.html">Read now →</a>
                    </p>
                </div>

                <FeatureItem
                    icon={discoverIcon}
                    title="Discover us"
                    description="Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus."
                    linkText="Learn more"
                    linkHref="index.html"
                    isLast
                />
            </div>

            <div style={{ height: '60px' }} aria-hidden="true" className="wp-block-spacer"></div>
        </div>
    );
};