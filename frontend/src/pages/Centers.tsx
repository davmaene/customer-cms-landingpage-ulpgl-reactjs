import { useLocation } from 'react-router-dom';
import { BreadcrumpComponent } from '../components/subcomponents/BreadcrumpCompont';
import heroImage from '../assets/images/hero-image.png';
import { LuChevronRight } from 'react-icons/lu';
import { Colors } from '../utils/utils.colors';
import { ExploreCenters } from '../components/Centers.component';

const LuChevronRightIcon = LuChevronRight as any;

export const Centers: React.FC = () => {

    return (
        <>
            <BreadcrumpComponent
                imageCover={heroImage}
                subtitle={"De l'innovation technologique à la gestion économique, découvrez nos pôles d'expertise. Trouvez la filière idéale pour transformer votre passion en une carrière solide et impactante."}
                title={<span style={{ color: Colors.whiteColor }}>Nos centres de recherche</span>}
            />
            <div style={{ height: '152px' }} aria-hidden="true" className="wp-block-spacer" />
            <ExploreCenters />
        </>
    );
}