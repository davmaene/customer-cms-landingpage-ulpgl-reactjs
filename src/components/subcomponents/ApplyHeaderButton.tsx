export const ApplyButton: React.FC<{ canBeShown?: boolean }> = ({ canBeShown }) => {
    if (!canBeShown) return null;

    return (
        <div className="wp-block-group wpz-hide-mobile is-content-justification-left is-nowrap is-layout-flex wp-container-core-group-is-layout-fc9f69e7 wp-block-group-is-layout-flex">
            <div className="wp-block-outermost-icon-block"
                style={{ marginBottom: 0, marginLeft: 0, marginRight: 0, marginTop: 0 }}>
                <div className="icon-container has-icon-color"
                    style={{ paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, color: 'var(--wp--preset--color--secondary)', width: '27px' }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M16.08 13.3604L6.66663 22.7737V24.0004H7.89329L17.3066 14.587L16.08 13.3604Z" fill="var(--wp--preset--color--secondary)"></path>
                        <path d="M20 21.3335L14.6667 26.6669H28V21.3335H20ZM16.08 9.58685L4 21.6669V26.6669H9L21.08 14.5869L16.08 9.58685ZM7.89333 24.0002H6.66667V22.7735L16.08 13.3602L17.3067 14.5869L7.89333 24.0002ZM24.9467 10.7202C25.0703 10.5968 25.1683 10.4503 25.2352 10.289C25.3022 10.1277 25.3366 9.95481 25.3366 9.78019C25.3366 9.60556 25.3022 9.43265 25.2352 9.27135C25.1683 9.11006 25.0703 8.96354 24.9467 8.84019L21.8267 5.72019C21.5767 5.47217 21.2388 5.33301 20.8867 5.33301C20.5345 5.33301 20.1967 5.47217 19.9467 5.72019L17.5067 8.16019L22.5067 13.1602L24.9467 10.7202Z" fill="var(--wp--preset--color--secondary)"></path>
                    </svg>
                </div>
            </div>
            <p style={{ marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0 }}>
                <a href="/">Demander une admission</a>
            </p>
        </div>
    );
};