export const FeatureItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    isLast?: boolean
}> = ({ icon, title, description, linkText, linkHref, isLast }) => {
    return (
        <div className="wp-block-column is-style-default is-layout-flow wp-block-column-is-layout-flow"
            style={{ borderTopStyle: 'none', borderTopWidth: '0px', borderBottomStyle: 'none', borderBottomWidth: '0px', paddingRight: '5%', ... !isLast ? { borderRightColor: '#6c6c77', borderRightWidth: '1px' } : {} }}>

            <div className="wp-block-columns are-vertically-aligned-center is-not-stacked-on-mobile is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '72px' }}>
                    {icon}
                </div>
                <div className="wp-block-column is-vertically-aligned-center is-layout-flow wp-block-column-is-layout-flow"
                    style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, flexBasis: '100%' }}>
                    <h4 className="wp-block-heading has-text-align-left has-white-color has-text-color">{title}</h4>
                </div>
            </div>

            <p className="has-lightgrey-color has-text-color">{description}</p>

            <div style={{ height: '50px' }} aria-hidden="true" className="wp-block-spacer"></div>

            <p className="has-link-color has-small-font-size" style={{ marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
                <a href={linkHref}><strong>{linkText}</strong> →</a>
            </p>
        </div>
    );
};