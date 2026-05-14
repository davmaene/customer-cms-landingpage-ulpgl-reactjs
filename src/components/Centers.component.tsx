import { shuffleArray } from "../utils/utils.fucntions";
import { useData } from "../contexts/DataContext";
import { ExploreCenterCard } from "./subcomponents/ExploreCenterCard";

export const ExploreCenters: React.FC = () => {
    const { centers } = useData();
    const exploreItems = shuffleArray(centers);

    return (
        <>
            <div style={{ height: '51px' }} aria-hidden="true" className="wp-block-spacer"></div>

            <div id="explore" className="wp-block-group has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-layout-container">
                <div className="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
                    <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}>
                        <h2 className="wp-block-heading has-text-align-left has-primary-color has-text-color has-max-48-font-size">
                            Nos centres de recherche
                        </h2>
                        <p className="has-tertiary-color has-text-color">
                            De l'innovation technologique à la gestion économique, découvrez nos pôles d'expertise. Trouvez la filière idéale pour transformer votre passion en une carrière solide et impactante.
                        </p>
                    </div>
                    <div className="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style={{ flexBasis: '50%' }}></div>
                </div>

                <div style={{ height: '46px' }} aria-hidden="true" className="wp-block-spacer"></div>

                <div
                    className="explore-grid"
                // style={{ borderRadius: '0px', display: "grid", gridTemplateColumns: 'repeat(3, 1fr)', gap: "20px" }}
                >
                    {exploreItems.map((item, index) => (
                        <ExploreCenterCard key={index} {...item} />
                    ))}
                </div>

                <div style={{ height: '100px' }} aria-hidden="true" className="wp-block-spacer"></div>
            </div>
        </>
    );
};